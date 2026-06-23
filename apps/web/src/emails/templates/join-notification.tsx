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
      <IllustrationBox />
      <Text style={heading}>New Join Request</Text>
      <Section>
        <Field label="Name" value={fullName} />
        <Field label="Email" value={email} />
        <Field label="Phone" value={phone} />
        <Field label="Focus area" value={focusArea} />
        <Field label="Submitted" value={submittedAt} />
      </Section>
      <Hr style={{ borderColor: brand.border, margin: "20px 0" }} />
      <Text style={label}>What they are believing God for</Text>
      <Text style={{ ...paragraph, whiteSpace: "pre-line" as const }}>{believing}</Text>
    </EmailLayout>
  )
}
