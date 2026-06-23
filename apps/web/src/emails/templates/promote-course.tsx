import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { EmailLayout } from "../components/layout"
import { heading, paragraph, strong } from "../components/text-styles"

export function PromoteCourseEmail({ courseUrl }: { courseUrl: string }) {
  return (
    <EmailLayout previewText="Ready for the next step?">
      <Text style={heading}>Ready for the next step?</Text>
      <Text style={paragraph}>Hope the e-book has been speaking to you.</Text>
      <Text style={paragraph}>
        If you're ready to put it into practice, the <span style={strong}>Faith on Fire Course</span>{" "}
        gives you the full step-by-step roadmap, tools, and action steps to actually walk it out.
      </Text>
      <CtaButton label="Explore the Course" url={courseUrl} />
    </EmailLayout>
  )
}
