import { render } from "@react-email/render"
import type { ReactElement } from "react"

export type EmailContent = {
  subject: string
  text: string
  html: string
}

export async function renderEmail(component: ReactElement, subject: string): Promise<EmailContent> {
  const [html, text] = await Promise.all([
    render(component),
    render(component, { plainText: true }),
  ])
  return { subject, text, html }
}
