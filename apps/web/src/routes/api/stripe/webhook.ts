import { createFileRoute } from "@tanstack/react-router"
import type Stripe from "stripe"

import { getStripeClient, isStripeConfigured } from "@/lib/stripe"
import { findUserByEmail, getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin"
import { generateTempPassword } from "@/lib/temp-password"
import { products } from "@/lib/checkout-form"
import type { Product } from "@/lib/checkout-form"
import { sendPurchaseEmail } from "@/server/purchase-email"
import { scheduleFollowUpEmails } from "@/server/email-sequences"

async function provisionPurchase(session: Stripe.Checkout.Session) {
  const product = session.metadata?.product
  const email = session.customer_details?.email
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id

  if (!product || !(products as readonly string[]).includes(product) || !email || !customerId) {
    return
  }

  const admin = getSupabaseAdminClient()
  const tempPasswordAttempt = generateTempPassword()

  const created = await admin.auth.admin.createUser({
    email,
    password: tempPasswordAttempt,
    email_confirm: true,
  })

  let userId: string
  let tempPassword: string | null = null

  if (created.data.user) {
    userId = created.data.user.id
    tempPassword = tempPasswordAttempt
  } else {
    const existing = await findUserByEmail(admin, email)
    if (!existing) return
    userId = existing.id
  }

  await admin
    .from("purchases")
    .upsert(
      {
        user_id: userId,
        product,
        stripe_customer_id: customerId,
        stripe_checkout_session_id: session.id,
        stripe_subscription_id: subscriptionId ?? null,
        status: "active",
      },
      { onConflict: "user_id,product" },
    )

  await sendPurchaseEmail({ email, product: product as Product, tempPassword })
  await scheduleFollowUpEmails(product as Product, email)
}

async function syncSubscriptionStatus(subscription: Stripe.Subscription, canceled: boolean) {
  const admin = getSupabaseAdminClient()
  const status = canceled
    ? "canceled"
    : subscription.status === "active" || subscription.status === "trialing"
      ? "active"
      : subscription.status === "past_due" || subscription.status === "unpaid"
        ? "past_due"
        : "canceled"

  await admin
    .from("purchases")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscription.id)
}

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isStripeConfigured() || !isSupabaseAdminConfigured()) {
          return new Response("Not configured", { status: 503 })
        }

        const signature = request.headers.get("stripe-signature")
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
        if (!signature || !webhookSecret) {
          return new Response("Missing signature", { status: 400 })
        }

        const payload = await request.text()
        const stripe = getStripeClient()

        let event: Stripe.Event
        try {
          event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
        } catch {
          return new Response("Invalid signature", { status: 400 })
        }

        switch (event.type) {
          case "checkout.session.completed":
            await provisionPurchase(event.data.object)
            break
          case "customer.subscription.updated":
            await syncSubscriptionStatus(event.data.object, false)
            break
          case "customer.subscription.deleted":
            await syncSubscriptionStatus(event.data.object, true)
            break
        }

        return new Response(null, { status: 200 })
      },
    },
  },
})
