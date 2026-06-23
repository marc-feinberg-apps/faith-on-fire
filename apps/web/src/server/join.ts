import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

import { JoinNotificationEmail } from "@/emails/templates/join-notification"
import { getFocusAreaLabel, joinFormSchema } from "@/lib/join-form"
import { renderEmail } from "@/server/email-render"

export const submitJoinRequest = createServerFn({ method: "POST" })
  .validator(joinFormSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    const to = process.env.RESEND_JOIN_TO_EMAIL ?? "support@faithonfire.world"

    if (!apiKey || !from) {
      throw new Error("Email is not configured yet.")
    }

    const resend = new Resend(apiKey)
    const fullName = `${data.firstName} ${data.lastName}`.trim()
    const focusArea = getFocusAreaLabel(data.focusArea)
    const phone = data.phone?.trim() || "Not provided"
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York",
    })

    const { subject, text, html } = await renderEmail(
      JoinNotificationEmail({
        fullName,
        email: data.email,
        phone,
        focusArea,
        submittedAt,
        believing: data.believing,
      }),
      `New Faith on Fire join request from ${fullName}`,
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
