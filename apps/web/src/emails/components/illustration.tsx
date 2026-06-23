import { Img, Section, Text } from "@react-email/components"

import { brand } from "./brand"

const SITE_URL = "https://www.faithonfire.world"

export function IllustrationBox({ ribbon }: { ribbon?: string }) {
  return (
    <Section style={box}>
      {ribbon ? <Text style={ribbonText}>{ribbon}</Text> : null}
      <Img
        src={`${SITE_URL}/assets/brand/faith-on-fire-icon-transparent.png`}
        alt="Faith on Fire"
        width="96"
        height="48"
        style={{ display: "block", margin: "0 auto" }}
      />
    </Section>
  )
}

const box: React.CSSProperties = {
  backgroundColor: brand.warmCream,
  borderRadius: "16px",
  padding: "28px 24px",
  margin: "0 0 28px",
  textAlign: "center" as const,
}

const ribbonText: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: brand.flameOrange,
  margin: "0 0 14px",
}
