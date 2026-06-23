import { Resend } from "resend"

import { siteConfig } from "@/data/site"
import { PurchaseAccessEmail } from "@/emails/templates/purchase-access"
import { PurchaseCredentialsEmail } from "@/emails/templates/purchase-credentials"
import { productLabels } from "@/lib/checkout-form"
import type { Product } from "@/lib/checkout-form"
import { renderEmail } from "@/server/email-render"

export async function sendPurchaseEmail({
  email,
  product,
  tempPassword,
}: {
  email: string
  product: Product
  tempPassword: string | null
}) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) return

  const resend = new Resend(apiKey)
  const productLabel = productLabels[product]
  const loginUrl = `${siteConfig.url}/login`

  if (tempPassword) {
    const { subject, text, html } = await renderEmail(
      PurchaseCredentialsEmail({ productLabel, email, password: tempPassword, loginUrl }),
      `Welcome to ${productLabel} — your login details`,
    )
    const { error } = await resend.emails.send({ from, to: email, subject, text, html })
    if (error) console.error("sendPurchaseEmail (welcome) failed:", error)
    return
  }

  const { subject, text, html } = await renderEmail(
    PurchaseAccessEmail({ productLabel, loginUrl }),
    `You now have access to ${productLabel}`,
  )
  const { error } = await resend.emails.send({ from, to: email, subject, text, html })
  if (error) console.error("sendPurchaseEmail (access granted) failed:", error)
}
