import { Section, Text } from "@react-email/components"

import { brand } from "./brand"
import { credentialLabel, credentialValue, value } from "./text-styles"

export function CredentialsBox({ email, password }: { email: string; password: string }) {
  return (
    <Section style={box}>
      <Text style={row}>
        <span style={credentialLabel}>Email</span>
        <br />
        <span style={value}>{email}</span>
      </Text>
      <Text style={{ ...row, marginBottom: 0 }}>
        <span style={credentialLabel}>Temporary password</span>
        <br />
        <span style={credentialValue}>{password}</span>
      </Text>
    </Section>
  )
}

const box: React.CSSProperties = {
  backgroundColor: brand.surfaceRaised,
  border: `1px solid ${brand.border}`,
  borderRadius: "14px",
  padding: "20px 24px",
  margin: "20px 0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
}

const row: React.CSSProperties = {
  fontFamily: brand.fontBody,
  fontSize: "15px",
  margin: "0 0 16px",
}
