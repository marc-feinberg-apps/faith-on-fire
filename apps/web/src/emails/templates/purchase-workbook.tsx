import { Column, Row, Section, Text } from "@react-email/components"

import { brand } from "../components/brand"
import { CtaButton } from "../components/cta-button"
import { HeroRow } from "../components/hero-row"
import { EmailLayout } from "../components/layout"
import { StatCircle } from "../components/stat-circle"
import { paragraph } from "../components/text-styles"
import { EMAIL_ASSETS_URL } from "../components/urls"

export function PurchaseWorkbookEmail({
  productLabel,
  workbookUrl,
}: {
  productLabel: string
  workbookUrl: string
}) {
  return (
    <EmailLayout previewText="Your Course Blueprint Workbook is ready — download it now">
      <HeroRow
        headlineLines={["Your Blueprint"]}
        accentLine="Awaits."
        imageSrc={`${EMAIL_ASSETS_URL}/workbook-cover.png`}
        imageAlt="Your Course Blueprint Workbook"
      />

      <Section style={box}>
        <Row>
          <Column style={{ width: "120px", verticalAlign: "middle" as const }}>
            <StatCircle value="12" label="Modules" size={100} />
          </Column>
          <Column style={{ verticalAlign: "middle" as const, paddingLeft: "20px" }}>
            <Text style={{ ...paragraph, fontSize: "14px", lineHeight: "22px", margin: 0 }}>
              Every module in the{" "}
              <span style={{ color: brand.gold, fontWeight: 700 }}>{productLabel}</span> is paired
              with a guided workbook exercise. Open it alongside each lesson and do the work —
              that's where the real breakthrough happens.
            </Text>
          </Column>
        </Row>
      </Section>

      <Text style={paragraph}>
        Hit the button below to download your personal copy. Keep it somewhere easy to find.
      </Text>
      <CtaButton label="Download Your Workbook (PDF)" url={workbookUrl} />
      <Text style={note}>
        This link is personal to you and expires in 30 days. You can always log in to your course
        library to get a fresh download link.
      </Text>
    </EmailLayout>
  )
}

const box: React.CSSProperties = {
  backgroundColor: brand.surfaceRaised,
  border: `1px solid ${brand.gold}`,
  borderRadius: "16px",
  padding: "24px",
  margin: "0 0 20px",
}

const note: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontSize: "13px",
  lineHeight: "20px",
  color: brand.mutedForeground,
  margin: "16px 0 0",
  textAlign: "center" as const,
}
