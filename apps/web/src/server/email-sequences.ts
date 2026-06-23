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
  delayMs: number | (() => number)
  template: () => Promise<{ subject: string; text: string; html: string }>
}

const MINUTE = 60 * 1000
const DAY = 24 * 60 * MINUTE

const coachingCallDelay = () => MINUTE * (15 + Math.random() * 15) // 15-30 min

const SEQUENCES: Record<SequenceProduct, SequenceStep[]> = {
  ebook: [{ delayMs: 2 * DAY, template: promoteCourseTemplate }],
  course: [
    { delayMs: coachingCallDelay, template: coachingCallTemplate },
    { delayMs: 1 * DAY, template: promoteMastermindTemplate },
  ],
  mastermind: [
    { delayMs: coachingCallDelay, template: coachingCallTemplate },
    { delayMs: 15 * MINUTE, template: mastermindZoomTemplate },
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
      const delayMs = typeof step.delayMs === "function" ? step.delayMs() : step.delayMs
      const scheduledAt = new Date(Date.now() + delayMs).toISOString()
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
