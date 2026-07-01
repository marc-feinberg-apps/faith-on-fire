import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { FeatureGrid } from "../components/feature-grid"
import { HeroRow } from "../components/hero-row"
import { EmailLayout } from "../components/layout"
import { paragraph, strong } from "../components/text-styles"
import { EMAIL_ASSETS_URL } from "../components/urls"

const pillars = [
  { title: "Return", description: "Come home to God and rebuild your walk with Him." },
  { title: "Restore", description: "Repair what's broken in your closest relationships." },
  { title: "Reignite", description: "Rediscover your purpose and walk it out daily." },
]

export function PromoteCourseEmail({ courseUrl }: { courseUrl: string }) {
  return (
    <EmailLayout previewText="Ready for the next step?" footerVariant="marketing">
      <HeroRow
        headlineLines={["Ready for the"]}
        accentLine="Next Step?"
        imageSrc={`${EMAIL_ASSETS_URL}/promote-course-hero.png`}
        imageAlt="Faith on Fire Course"
      />
      <Text style={paragraph}>Hope the e-book has been speaking to you.</Text>
      <Text style={paragraph}>
        If you're ready to put it into practice, the <span style={strong}>Faith on Fire Course</span>{" "}
        gives you the full step-by-step roadmap, tools, and action steps to actually walk it out.
      </Text>
      <FeatureGrid items={pillars} />
      <CtaButton label="Explore the Course" url={courseUrl} />
    </EmailLayout>
  )
}
