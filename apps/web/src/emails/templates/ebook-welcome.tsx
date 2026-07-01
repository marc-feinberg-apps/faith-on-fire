import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { FeatureGrid } from "../components/feature-grid"
import { HeroRow } from "../components/hero-row"
import { EmailLayout } from "../components/layout"
import { paragraph, strong } from "../components/text-styles"
import { EBOOK_COVER_URL } from "../components/urls"

const features = [
  { title: "Read", description: "Work through the book at your own pace, chapter by chapter." },
  { title: "Reflect", description: "Sit with the questions — this is where the real work happens." },
  { title: "Grow", description: "Take what you learn and put it into practice this week." },
]

export function EbookWelcomeEmail({ courseUrl }: { courseUrl: string }) {
  return (
    <EmailLayout previewText="Your Faith on Fire e-book is on its way">
      <HeroRow
        headlineLines={["Welcome to the"]}
        accentLine="Brotherhood."
        imageSrc={EBOOK_COVER_URL}
        imageAlt="The Faith on Fire e-book cover"
      />
      <Text style={paragraph}>
        Thanks for grabbing the e-book — your download and receipt are on the way from SamCart.
      </Text>
      <Text style={paragraph}>
        When you're ready to go deeper, the <span style={strong}>Faith on Fire Course</span> walks
        you through the full Return, Restore, Reignite roadmap step by step.
      </Text>
      <FeatureGrid items={features} />
      <CtaButton label="Check out the Course" url={courseUrl} />
    </EmailLayout>
  )
}
