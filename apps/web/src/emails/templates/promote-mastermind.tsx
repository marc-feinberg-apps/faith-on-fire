import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { FeatureGrid } from "../components/feature-grid"
import { HeroRow } from "../components/hero-row"
import { EmailLayout } from "../components/layout"
import { paragraph, strong } from "../components/text-styles"
import { EMAIL_ASSETS_URL } from "../components/urls"

const features = [
  { title: "Weekly Calls", description: "A standing Saturday call — same time, every week." },
  { title: "Accountability", description: "Men who'll actually ask how you're doing, and mean it." },
  { title: "Brotherhood", description: "Community that keeps showing up when life gets hard." },
  { title: "Prayer", description: "Carry each other's burdens in real, practical ways." },
]

export function PromoteMastermindEmail({ mastermindUrl }: { mastermindUrl: string }) {
  return (
    <EmailLayout previewText="You don't have to do this alone" footerVariant="marketing">
      <HeroRow
        headlineLines={["You Don't Have"]}
        accentLine="To Do This Alone."
        imageSrc={`${EMAIL_ASSETS_URL}/promote-mastermind-hero.png`}
        imageAlt="Faith on Fire Mastermind"
      />
      <Text style={paragraph}>
        The <span style={strong}>Faith on Fire Mastermind</span> is a standing weekly brotherhood:
        men showing up, telling the truth, and getting sharpened together.
      </Text>
      <FeatureGrid items={features} />
      <CtaButton label="See the Mastermind" url={mastermindUrl} />
    </EmailLayout>
  )
}
