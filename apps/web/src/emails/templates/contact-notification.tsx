import { Hr, Row, Section, Text } from "@react-email/components"

import { brand } from "../components/brand"
import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, label, paragraph, value } from "../components/text-styles"

function Field({ label: fieldLabel, value: fieldValue }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "12px" }}>
      <Text style={label}>{fieldLabel}</Text>
      <Text style={value}>{fieldValue}</Text>
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
    <EmailLayout previewText={`New contact message from ${fullName}`}>
      <IllustrationBox />
      <Text style={heading}>New Contact Message</Text>
      <Section>
        <Field label="Name" value={fullName} />
        <Field label="Email" value={email} />
        <Field label="Topic" value={topic} />
        <Field label="Submitted" value={submittedAt} />
      </Section>
      <Hr style={{ borderColor: brand.border, margin: "20px 0" }} />
      <Text style={label}>Message</Text>
      <Text style={{ ...paragraph, whiteSpace: "pre-line" as const }}>{message}</Text>
    </EmailLayout>
  )
}
