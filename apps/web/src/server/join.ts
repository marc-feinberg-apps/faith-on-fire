import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

import { getFocusAreaLabel, joinFormSchema } from "@/lib/join-form"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

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

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New Faith on Fire join request from ${fullName}`,
      text: [
        "New Faith on Fire join request",
        "",
        `Name: ${fullName}`,
        `Email: ${data.email}`,
        `Phone: ${phone}`,
        `Focus area: ${focusArea}`,
        `Submitted: ${submittedAt}`,
        "",
        "What they are believing God for:",
        data.believing,
      ].join("\n"),
      html: `
        <h2>New Faith on Fire join request</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Focus area:</strong> ${escapeHtml(focusArea)}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <h3>What they are believing God for</h3>
        <p>${escapeHtml(data.believing).replaceAll("\n", "<br />")}</p>
      `,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { ok: true }
  })
