import { createFileRoute } from "@tanstack/react-router"

import { scheduleFollowUpEmails, sendEbookWelcomeEmail } from "@/server/email-sequences"

export const Route = createFileRoute("/api/samcart/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.SAMCART_WEBHOOK_SECRET
        if (!webhookSecret) {
          return new Response("Not configured", { status: 503 })
        }

        const url = new URL(request.url)
        if (url.searchParams.get("secret") !== webhookSecret) {
          return new Response("Unauthorized", { status: 401 })
        }

        const body = await request.json().catch(() => null)
        const email = typeof body?.email === "string" ? body.email : null
        if (!email) {
          return new Response("Missing email", { status: 400 })
        }

        await sendEbookWelcomeEmail(email)
        await scheduleFollowUpEmails("ebook", email)

        return new Response(null, { status: 200 })
      },
    },
  },
})
