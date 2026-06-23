import { Resend } from "resend"

import { escapeHtml } from "@/lib/escape-html"
import { productLabels } from "@/lib/checkout-form"
import type { Product } from "@/lib/checkout-form"
import { siteConfig } from "@/data/site"

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
    await resend.emails.send({
      from,
      to: email,
      subject: `Welcome to ${productLabel} — your login details`,
      text: [
        `Welcome to ${productLabel}!`,
        "",
        `Email: ${email}`,
        `Temporary password: ${tempPassword}`,
        "",
        `Log in here: ${loginUrl}`,
        "",
        "You can change your password any time from your account page.",
      ].join("\n"),
      html: `
        <h2>Welcome to ${escapeHtml(productLabel)}!</h2>
        <p>Your account is ready.</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Temporary password:</strong> ${escapeHtml(tempPassword)}</p>
        <p><a href="${loginUrl}">Log in to Faith on Fire</a></p>
        <p>You can change your password any time from your account page.</p>
      `,
    })
    return
  }

  await resend.emails.send({
    from,
    to: email,
    subject: `You now have access to ${productLabel}`,
    text: [
      `Good news — you now have access to ${productLabel}.`,
      "",
      `Log in with your existing account: ${loginUrl}`,
    ].join("\n"),
    html: `
      <h2>You now have access to ${escapeHtml(productLabel)}</h2>
      <p>Log in with your existing account to get started.</p>
      <p><a href="${loginUrl}">Log in to Faith on Fire</a></p>
    `,
  })
}
