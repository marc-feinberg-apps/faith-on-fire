import { Text } from "@react-email/components"

import { brand } from "../components/brand"
import { CtaButton } from "../components/cta-button"
import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, paragraph } from "../components/text-styles"

export function PurchaseWorkbookEmail({
  productLabel,
  workbookUrl,
}: {
  productLabel: string
  workbookUrl: string
}) {
  return (
    <EmailLayout previewText="Your Course Blueprint Workbook is ready — download it now">
      <IllustrationBox ribbon="Your Workbook" />
      <Text style={heading}>Download Your Course Blueprint Workbook</Text>
      <Text style={paragraph}>
        Every module in the{" "}
        <span style={{ color: brand.gold, fontWeight: 700 }}>{productLabel}</span> is paired with
        a guided workbook exercise. Open it alongside each lesson and do the work — that's where the
        real breakthrough happens.
      </Text>
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

const note: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontSize: "13px",
  lineHeight: "20px",
  color: brand.mutedForeground,
  margin: "16px 0 0",
  textAlign: "center" as const,
}
