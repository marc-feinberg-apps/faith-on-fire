import { Hr, Row, Section, Text } from "@react-email/components"

import { EmailLayout } from "../components/layout"

const lightHeading: React.CSSProperties = {
  fontFamily: "'Oswald', 'Segoe UI', system-ui, sans-serif",
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
  color: "#CE2309",
  margin: "0 0 16px",
  lineHeight: "32px",
}

const lightLabel: React.CSSProperties = {
  fontFamily: "'Oswald', 'Segoe UI', system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "#625650",
  margin: "0 0 2px",
}

const lightValue: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontSize: "15px",
  color: "#171311",
  margin: "0 0 8px",
}

const lightParagraph: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontSize: "16px",
  lineHeight: "26px",
  color: "#171311",
  margin: "0 0 16px",
}

function Field({ label: fieldLabel, value: fieldValue }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "12px" }}>
      <Text style={lightLabel}>{fieldLabel}</Text>
      <Text style={lightValue}>{fieldValue}</Text>
    </Row>
  )
}

export function ContactNotificationEmail({
  fullName,
  email,
  topic,
  submittedAt,
  message,
}: {
  fullName: string
  email: string
  topic: string
  submittedAt: string
  message: string
}) {
  return (
    <EmailLayout previewText={`New contact message from ${fullName}`} theme="light">
      <Text style={lightHeading}>New Contact Message</Text>
      <Section>
        <Field label="Name" value={fullName} />
        <Field label="Email" value={email} />
        <Field label="Topic" value={topic} />
        <Field label="Submitted" value={submittedAt} />
      </Section>
      <Hr style={{ borderColor: "#DED6CE", margin: "20px 0" }} />
      <Text style={lightLabel}>Message</Text>
      <Text style={{ ...lightParagraph, whiteSpace: "pre-line" as const }}>{message}</Text>
    </EmailLayout>
  )
}
