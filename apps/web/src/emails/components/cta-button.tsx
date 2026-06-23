import { Button, Section } from "@react-email/components"

import { brand } from "./brand"

export function CtaButton({ label, url }: { label: string; url: string }) {
  return (
    <Section style={{ textAlign: "center" as const, margin: "24px 0 8px" }}>
      <Button href={url} style={button}>
        {label}
      </Button>
    </Section>
  )
}

const button: React.CSSProperties = {
  backgroundColor: brand.fireRed,
  color: "#FFFFFF",
  fontFamily: brand.fontDisplay,
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  borderRadius: "9999px",
  padding: "16px 32px",
  display: "inline-block",
}
