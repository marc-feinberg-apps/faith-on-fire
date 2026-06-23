import { siteConfig } from "@/data/site"
import { CoachingCallEmail } from "@/emails/templates/coaching-call"
import { EbookWelcomeEmail } from "@/emails/templates/ebook-welcome"
import { MastermindZoomEmail } from "@/emails/templates/mastermind-zoom"
import { PromoteCourseEmail } from "@/emails/templates/promote-course"
import { PromoteMastermindEmail } from "@/emails/templates/promote-mastermind"
import type { EmailContent } from "@/server/email-render"
import { renderEmail } from "@/server/email-render"

export function ebookWelcomeTemplate(): Promise<EmailContent> {
  const courseUrl = `${siteConfig.url}/blueprint`
  return renderEmail(
    EbookWelcomeEmail({ courseUrl }),
    "Your Faith on Fire e-book is on its way 🔥",
  )
}

export function promoteCourseTemplate(): Promise<EmailContent> {
  const courseUrl = `${siteConfig.url}/blueprint`
  return renderEmail(PromoteCourseEmail({ courseUrl }), "Ready for the next step?")
}

export function coachingCallTemplate(): Promise<EmailContent> {
  const calendlyUrl = process.env.CALENDLY_COACHING_URL ?? ""
  return renderEmail(
    CoachingCallEmail({ calendlyUrl, supportEmail: siteConfig.email }),
    "Got 15 minutes? Let's talk.",
  )
}

export function promoteMastermindTemplate(): Promise<EmailContent> {
  const mastermindUrl = `${siteConfig.url}/community`
  return renderEmail(
    PromoteMastermindEmail({ mastermindUrl }),
    "You don't have to do this alone",
  )
}

export function mastermindZoomTemplate(): Promise<EmailContent> {
  const zoomUrl = process.env.MASTERMIND_ZOOM_URL ?? ""
  return renderEmail(
    MastermindZoomEmail({ zoomUrl }),
    "Your weekly Mastermind call — save the time",
  )
}
