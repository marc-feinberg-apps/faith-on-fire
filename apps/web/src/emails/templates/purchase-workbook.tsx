import { Button, Section, Text } from "@react-email/components"

import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, paragraph } from "../components/text-styles"
import { brand } from "../components/brand"

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
        <span style={{ color: brand.fireRed, fontWeight: 700 }}>{productLabel}</span> is paired with
        a guided workbook exercise. Open it alongside each lesson and do the work — that's where the
        real breakthrough happens.
      </Text>
      <Text style={paragraph}>
        Hit the button below to download your personal copy. Keep it somewhere easy to find.
      </Text>
      <Section style={{ textAlign: "center" as const, margin: "24px 0 8px" }}>
        <Button href={workbookUrl} style={downloadButton}>
          Download Your Workbook (PDF)
        </Button>
      </Section>
      <Text style={note}>
        This link is personal to you and expires in 30 days. You can always log in to your course
        library to get a fresh download link.
      </Text>
    </EmailLayout>
  )
}

const downloadButton: React.CSSProperties = {
  backgroundColor: brand.flameOrange,
  color: "#FFFFFF",
  fontFamily: brand.fontDisplay,
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  borderRadius: "9999px",
  padding: "16px 36px",
  display: "inline-block",
  boxShadow: "0 8px 18px rgba(250, 109, 15, 0.35)",
}

const note: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontSize: "13px",
  lineHeight: "20px",
  color: brand.mutedForeground,
  margin: "16px 0 0",
  textAlign: "center" as const,
}
