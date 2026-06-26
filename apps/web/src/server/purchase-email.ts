import { Resend } from "resend"

import { siteConfig } from "@/data/site"
import { PurchaseAccessEmail } from "@/emails/templates/purchase-access"
import { PurchaseCredentialsEmail } from "@/emails/templates/purchase-credentials"
import { PurchaseWorkbookEmail } from "@/emails/templates/purchase-workbook"
import { productLabels } from "@/lib/checkout-form"
import type { Product } from "@/lib/checkout-form"
import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin"
import { renderEmail } from "@/server/email-render"

const WORKBOOK_BUCKET = "member-files"
const WORKBOOK_PATH = "course-blueprint/workbook.pdf"
// 30-day TTL so the link stays useful long after the email is read.
const WORKBOOK_URL_TTL = 60 * 60 * 24 * 30

// Products that include course access and should trigger the workbook email.
const COURSE_PRODUCTS: Product[] = ["course", "mastermind"]

async function mintWorkbookUrl(): Promise<string | null> {
  if (!isSupabaseAdminConfigured()) return null
  const admin = getSupabaseAdminClient()
  const { data } = await admin.storage
    .from(WORKBOOK_BUCKET)
    .createSignedUrl(WORKBOOK_PATH, WORKBOOK_URL_TTL)
  return data?.signedUrl ?? null
}

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
  } else {
    const { subject, text, html } = await renderEmail(
      PurchaseAccessEmail({ productLabel, loginUrl }),
      `You now have access to ${productLabel}`,
    )
    const { error } = await resend.emails.send({ from, to: email, subject, text, html })
    if (error) console.error("sendPurchaseEmail (access granted) failed:", error)
  }

  // Send workbook email immediately after the welcome/access email for any
  // product that includes course access.
  if (COURSE_PRODUCTS.includes(product)) {
    const workbookUrl = await mintWorkbookUrl()
    if (workbookUrl) {
      const { subject, text, html } = await renderEmail(
        PurchaseWorkbookEmail({ productLabel, workbookUrl }),
        `Your Course Blueprint Workbook — download it now`,
      )
      const { error } = await resend.emails.send({ from, to: email, subject, text, html })
      if (error) console.error("sendPurchaseEmail (workbook) failed:", error)
    }
  }
}
