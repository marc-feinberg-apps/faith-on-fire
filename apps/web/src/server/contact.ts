import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

import { ContactNotificationEmail } from "@/emails/templates/contact-notification"
import { contactFormSchema, getContactTopicLabel } from "@/lib/contact-form"
import { renderEmail } from "@/server/email-render"

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    const to = process.env.RESEND_CONTACT_TO_EMAIL ?? "support@faithonfire.world"

    if (!apiKey || !from) {
      throw new Error("Email is not configured yet.")
    }

    const resend = new Resend(apiKey)
    const fullName = `${data.firstName} ${data.lastName}`.trim()
    const topic = getContactTopicLabel(data.topic)
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York",
    })

    const { subject, text, html } = await renderEmail(
      ContactNotificationEmail({
        fullName,
        email: data.email,
        topic,
        submittedAt,
        message: data.message,
      }),
      `New contact message from ${fullName} — ${topic}`,
    )

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      text,
      html,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { ok: true }
  })
