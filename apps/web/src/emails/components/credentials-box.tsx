import { Section, Text } from "@react-email/components"

import { brand } from "./brand"

export function CredentialsBox({ email, password }: { email: string; password: string }) {
  return (
    <Section style={box}>
      <Text style={row}>
        <span style={label}>Email</span>
        <br />
        {email}
      </Text>
      <Text style={{ ...row, marginBottom: 0 }}>
        <span style={label}>Temporary password</span>
        <br />
        <span style={passwordValue}>{password}</span>
      </Text>
    </Section>
  )
}

const box: React.CSSProperties = {
  backgroundColor: brand.warmCream,
  border: `1px solid ${brand.border}`,
  borderRadius: "14px",
  padding: "20px 24px",
  margin: "20px 0",
  boxShadow: "0 4px 12px rgba(24, 19, 17, 0.05)",
}

const row: React.CSSProperties = {
  fontFamily: brand.fontBody,
  fontSize: "15px",
  color: brand.foreground,
  margin: "0 0 16px",
}

const label: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
}

const passwordValue: React.CSSProperties = {
  fontFamily: "'Courier New', monospace",
  fontSize: "16px",
  fontWeight: 700,
  color: brand.fireRed,
}
