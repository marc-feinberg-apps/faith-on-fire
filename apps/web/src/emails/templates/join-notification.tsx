import { Hr, Row, Section, Text } from "@react-email/components"

import { brand } from "../components/brand"
import { EmailLayout } from "../components/layout"
import { heading, paragraph } from "../components/text-styles"

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "12px" }}>
      <Text style={fieldLabel}>{label}</Text>
      <Text style={fieldValue}>{value}</Text>
    </Row>
  )
}

export function JoinNotificationEmail({
  fullName,
  email,
  phone,
  focusArea,
  submittedAt,
  believing,
}: {
  fullName: string
  email: string
  phone: string
  focusArea: string
  submittedAt: string
  believing: string
}) {
  return (
    <EmailLayout previewText={`New Faith on Fire join request from ${fullName}`}>
      <Text style={heading}>New Join Request</Text>
      <Section>
        <Field label="Name" value={fullName} />
        <Field label="Email" value={email} />
        <Field label="Phone" value={phone} />
        <Field label="Focus area" value={focusArea} />
        <Field label="Submitted" value={submittedAt} />
      </Section>
      <Hr style={{ borderColor: brand.border, margin: "20px 0" }} />
      <Text style={fieldLabel}>What they are believing God for</Text>
      <Text style={{ ...paragraph, whiteSpace: "pre-line" as const }}>{believing}</Text>
    </EmailLayout>
  )
}

const fieldLabel: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
  margin: "0 0 2px",
}

const fieldValue: React.CSSProperties = {
  fontFamily: brand.fontBody,
  fontSize: "15px",
  color: brand.foreground,
  margin: "0 0 8px",
}
