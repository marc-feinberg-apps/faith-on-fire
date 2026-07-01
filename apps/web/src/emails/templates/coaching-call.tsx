import { Column, Img, Link, Row, Section, Text } from "@react-email/components"

import { brand } from "../components/brand"
import { CtaButton } from "../components/cta-button"
import { FeatureGrid } from "../components/feature-grid"
import { EmailLayout } from "../components/layout"
import { StatCircle } from "../components/stat-circle"
import { paragraph } from "../components/text-styles"
import { EMAIL_ASSETS_URL } from "../components/urls"

const features = [
  {
    icon: "clarity.png",
    title: "Clarity",
    description: "Cut through the noise and get clear on what matters most.",
  },
  {
    icon: "direction.png",
    title: "Direction",
    description: "Gain perspective and identify the right next steps for your life.",
  },
  {
    icon: "breakthrough.png",
    title: "Breakthrough",
    description: "Overcome what's keeping you stuck and move forward.",
  },
  {
    icon: "ignite.png",
    title: "Ignite",
    description: "Leave encouraged, equipped, and ready to take action.",
  },
]

export function CoachingCallEmail({
  calendlyUrl,
  supportEmail,
}: {
  calendlyUrl: string
  supportEmail: string
}) {
  return (
    <EmailLayout previewText="Got 15 minutes? Let's talk.">
      <Row style={{ margin: "0 0 28px" }}>
        <Column style={{ width: "340px", verticalAlign: "middle" as const }}>
          <Text style={tagline}>Ignite Your Faith. Transform Your Life. Impact The World.</Text>
          <Text style={headlineTop}>Got 15</Text>
          <Text style={headlineTop}>Minutes?</Text>
          <Text style={headlineScript}>Let's talk.</Text>
        </Column>
        <Column style={{ verticalAlign: "middle" as const, paddingLeft: "16px" }}>
          <Img
            src={`${EMAIL_ASSETS_URL}/coaching-hero.png`}
            alt="A stone path winding up a mountain toward a cross at sunrise"
            width="220"
            style={{ display: "block", width: "100%", maxWidth: "220px", borderRadius: "12px" }}
          />
        </Column>
      </Row>

      <Section style={box}>
        <Row>
          <Column style={{ width: "120px", verticalAlign: "middle" as const }}>
            <StatCircle src={`${EMAIL_ASSETS_URL}/stat-circle-15min.png`} alt="15 minutes" size={100} />
          </Column>
          <Column style={{ verticalAlign: "middle" as const, paddingLeft: "20px" }}>
            <Text style={boxLabel}>As a member, you receive a</Text>
            <Text style={boxHeading}>Free 15-Minute Coaching Call with Marc.</Text>
            <Text style={{ ...paragraph, fontSize: "14px", lineHeight: "22px", margin: 0 }}>
              Real talk. Biblical wisdom. Practical next steps. This is your time to get clarity,
              break through what's holding you back, and move forward with{" "}
              <span style={{ color: brand.gold }}>purpose and confidence</span>.
            </Text>
          </Column>
        </Row>
      </Section>

      <FeatureGrid items={features} />

      {calendlyUrl ? (
        <CtaButton label="Book Your Free Call" url={calendlyUrl} />
      ) : (
        <Text style={paragraph}>
          Reach out to{" "}
          <Link href={`mailto:${supportEmail}`} style={{ color: brand.gold }}>
            {supportEmail}
          </Link>{" "}
          to schedule yours.
        </Text>
      )}

      <Text style={closingLine}>
        One conversation can <span style={{ color: brand.gold }}>change everything.</span>
      </Text>
    </EmailLayout>
  )
}

const tagline: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
  margin: "0 0 14px",
}

const headlineTop: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "0.01em",
  textTransform: "uppercase" as const,
  color: brand.foreground,
  margin: "0",
  lineHeight: "36px",
}

const headlineScript: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "26px",
  color: brand.gold,
  margin: "4px 0 0",
  lineHeight: "32px",
}

const box: React.CSSProperties = {
  backgroundColor: brand.surfaceRaised,
  border: `1px solid ${brand.gold}`,
  borderRadius: "16px",
  padding: "24px",
  margin: "0 0 8px",
}

const boxLabel: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
  margin: "0 0 4px",
}

const boxHeading: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "18px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  color: brand.gold,
  margin: "0 0 10px",
  lineHeight: "24px",
}

const closingLine: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  color: brand.foreground,
  textAlign: "center" as const,
  margin: "20px 0 0",
}
