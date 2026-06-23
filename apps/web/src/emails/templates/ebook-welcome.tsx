import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { EmailLayout } from "../components/layout"
import { heading, paragraph, strong } from "../components/text-styles"

export function EbookWelcomeEmail({ courseUrl }: { courseUrl: string }) {
  return (
    <EmailLayout previewText="Your Faith on Fire e-book is on its way">
      <Text style={heading}>Welcome to Faith on Fire!</Text>
      <Text style={paragraph}>
        Thanks for grabbing the e-book — your download and receipt are on the way from SamCart.
      </Text>
      <Text style={paragraph}>
        When you're ready to go deeper, the <span style={strong}>Faith on Fire Course</span> walks
        you through the full Return, Restore, Reignite roadmap step by step.
      </Text>
      <CtaButton label="Check out the Course" url={courseUrl} />
    </EmailLayout>
  )
}
