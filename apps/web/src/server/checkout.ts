import { createServerFn } from "@tanstack/react-start"
import { getRequest, getRequestHeader } from "@tanstack/react-start/server"
import { z } from "zod"

import { checkoutSchema } from "@/lib/checkout-form"
import type { Product } from "@/lib/checkout-form"
import { getStripeClient, isStripeConfigured } from "@/lib/stripe"

const priceIdByProduct: Record<Product, string | undefined> = {
  course: process.env.STRIPE_COURSE_PRICE_ID,
  mastermind: process.env.STRIPE_MASTERMIND_PRICE_ID,
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator(checkoutSchema)
  .handler(async ({ data }) => {
    if (!isStripeConfigured()) throw new Error("Checkout is not configured yet.")

    const priceId = priceIdByProduct[data.product]
    if (!priceId) throw new Error("Checkout is not configured yet.")

    const stripe = getStripeClient()
    const origin = new URL(getRequest().url).origin
    const cancelUrl = getRequestHeader("referer") ?? `${origin}/`

    const isSubscription = data.product === "mastermind"

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}&product=${data.product}`,
      cancel_url: cancelUrl,
      metadata: { product: data.product },
      // Subscriptions always get a Customer; one-time payments need this to
      // get a stripe_customer_id we can store alongside the purchase.
      ...(isSubscription ? {} : { customer_creation: "always" as const }),
    })

    if (!session.url) throw new Error("Could not start checkout.")
    return { url: session.url }
  })

export const getCheckoutSession = createServerFn({ method: "GET" })
  .validator(z.object({ sessionId: z.string() }))
  .handler(async ({ data }) => {
    if (!isStripeConfigured()) return { ok: false, email: null }

    const stripe = getStripeClient()
    try {
      const session = await stripe.checkout.sessions.retrieve(data.sessionId)
      const ok = session.status === "complete"
      return { ok, email: ok ? session.customer_details?.email ?? null : null }
    } catch {
      return { ok: false, email: null }
    }
  })
