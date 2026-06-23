import { escapeHtml } from "@/lib/escape-html"
import { siteConfig } from "@/data/site"

type EmailContent = {
  subject: string
  text: string
  html: string
}

function ctaButton(label: string, url: string) {
  return `<a href="${url}" style="display:inline-block;margin-top:16px;padding:14px 28px;background:#e25822;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;">${escapeHtml(label)}</a>`
}

export function ebookWelcomeTemplate(): EmailContent {
  const courseUrl = `${siteConfig.url}/blueprint`
  return {
    subject: "Your Faith on Fire e-book is on its way 🔥",
    text: [
      "Welcome to Faith on Fire!",
      "",
      "Thanks for grabbing the e-book — check your inbox (and SamCart receipt) for your download.",
      "",
      "When you're ready to go deeper, the Faith on Fire Course walks you through the full Return, Restore, Reignite roadmap step by step.",
      "",
      `Check it out here: ${courseUrl}`,
    ].join("\n"),
    html: `
      <h2>Welcome to Faith on Fire!</h2>
      <p>Thanks for grabbing the e-book — your download and receipt are on the way from SamCart.</p>
      <p>When you're ready to go deeper, the <strong>Faith on Fire Course</strong> walks you through the full Return, Restore, Reignite roadmap step by step.</p>
      ${ctaButton("Check out the Course", courseUrl)}
    `,
  }
}

export function promoteCourseTemplate(): EmailContent {
  const courseUrl = `${siteConfig.url}/blueprint`
  return {
    subject: "Ready for the next step?",
    text: [
      "Hey — hope the e-book has been speaking to you.",
      "",
      "If you're ready to put it into practice, the Faith on Fire Course gives you the full step-by-step roadmap, tools, and action steps to actually walk it out.",
      "",
      `Take a look: ${courseUrl}`,
    ].join("\n"),
    html: `
      <h2>Ready for the next step?</h2>
      <p>Hope the e-book has been speaking to you.</p>
      <p>If you're ready to put it into practice, the <strong>Faith on Fire Course</strong> gives you the full step-by-step roadmap, tools, and action steps to actually walk it out.</p>
      ${ctaButton("Explore the Course", courseUrl)}
    `,
  }
}

export function coachingCallTemplate(): EmailContent {
  const calendlyUrl = process.env.CALENDLY_COACHING_URL ?? ""
  return {
    subject: "Got 15 minutes? Let's talk.",
    text: [
      "Welcome aboard!",
      "",
      "As part of your membership, you get a free 15-minute coaching call with Marc — a chance to talk through where you're at and get pointed in the right direction.",
      "",
      calendlyUrl ? `Grab a time here: ${calendlyUrl}` : "Reach out to support@faithonfire.world to schedule yours.",
    ].join("\n"),
    html: `
      <h2>Got 15 minutes? Let's talk.</h2>
      <p>As part of your membership, you get a <strong>free 15-minute coaching call with Marc</strong> — a chance to talk through where you're at and get pointed in the right direction.</p>
      ${calendlyUrl ? ctaButton("Book Your Free Call", calendlyUrl) : `<p>Reach out to <a href="mailto:${siteConfig.email}">${siteConfig.email}</a> to schedule yours.</p>`}
    `,
  }
}

export function promoteMastermindTemplate(): EmailContent {
  const mastermindUrl = `${siteConfig.url}/community`
  return {
    subject: "You don't have to do this alone",
    text: [
      "One more thing —",
      "",
      "The Faith on Fire Mastermind is a standing weekly brotherhood: men showing up, telling the truth, and getting sharpened together.",
      "",
      `See what it's about: ${mastermindUrl}`,
    ].join("\n"),
    html: `
      <h2>You don't have to do this alone</h2>
      <p>The <strong>Faith on Fire Mastermind</strong> is a standing weekly brotherhood: men showing up, telling the truth, and getting sharpened together.</p>
      ${ctaButton("See the Mastermind", mastermindUrl)}
    `,
  }
}

export function mastermindZoomTemplate(): EmailContent {
  const zoomUrl = process.env.MASTERMIND_ZOOM_URL ?? ""
  return {
    subject: "Your weekly Mastermind call — save the time",
    text: [
      "You're in!",
      "",
      "The Mastermind meets every Saturday at 10:00 AM ET for 90 minutes on Zoom. Same link every week — bookmark it.",
      "",
      zoomUrl ? `Join here: ${zoomUrl}` : "We'll send the Zoom link separately — keep an eye on your inbox.",
    ].join("\n"),
    html: `
      <h2>Your weekly Mastermind call</h2>
      <p>The Mastermind meets <strong>every Saturday at 10:00 AM ET for 90 minutes</strong> on Zoom. Same link every week — bookmark it.</p>
      ${zoomUrl ? ctaButton("Join the Zoom Call", zoomUrl) : `<p>We'll send the Zoom link separately — keep an eye on your inbox.</p>`}
    `,
  }
}
