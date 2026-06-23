import { Resend } from "resend"

import {
  coachingCallTemplate,
  ebookWelcomeTemplate,
  mastermindZoomTemplate,
  promoteCourseTemplate,
  promoteMastermindTemplate,
} from "@/server/email-templates"

export type SequenceProduct = "ebook" | "course" | "mastermind"

type SequenceStep = {
  delayDays: number
  template: () => Promise<{ subject: string; text: string; html: string }>
}

const SEQUENCES: Record<SequenceProduct, SequenceStep[]> = {
  ebook: [{ delayDays: 2, template: promoteCourseTemplate }],
  course: [
    { delayDays: 1, template: coachingCallTemplate },
    { delayDays: 5, template: promoteMastermindTemplate },
  ],
  mastermind: [
    { delayDays: 1, template: coachingCallTemplate },
    { delayDays: 2, template: mastermindZoomTemplate },
  ],
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) return null
  return { resend: new Resend(apiKey), from }
}

export async function scheduleFollowUpEmails(product: SequenceProduct, email: string) {
  const client = getResendClient()
  if (!client) return

  const steps = SEQUENCES[product]
  await Promise.all(
    steps.map(async (step) => {
      const { subject, text, html } = await step.template()
      const scheduledAt = new Date(Date.now() + step.delayDays * 24 * 60 * 60 * 1000).toISOString()
      const { error } = await client.resend.emails.send({
        from: client.from,
        to: email,
        subject,
        text,
        html,
        scheduledAt,
      })
      if (error) console.error(`scheduleFollowUpEmails (${product}) failed:`, error)
    }),
  )
}

export async function sendEbookWelcomeEmail(email: string) {
  const client = getResendClient()
  if (!client) return

  const { subject, text, html } = await ebookWelcomeTemplate()
  const { error } = await client.resend.emails.send({ from: client.from, to: email, subject, text, html })
  if (error) console.error("sendEbookWelcomeEmail failed:", error)
}
