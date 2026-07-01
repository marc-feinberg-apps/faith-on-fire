import { Img, Section, Text } from "@react-email/components"

import { brand } from "./brand"
import { SITE_URL } from "./urls"

export function IllustrationBox({ ribbon }: { ribbon?: string }) {
  return (
    <Section style={box}>
      {ribbon ? <Text style={ribbonText}>{ribbon}</Text> : null}
      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
        <tr>
          <td style={iconBadge}>
            <Img
              src={`${SITE_URL}/assets/brand/faith-on-fire-icon-white.png`}
              alt="Faith on Fire"
              width="72"
              height="36"
              style={{ display: "block" }}
            />
          </td>
        </tr>
      </table>
    </Section>
  )
}

const box: React.CSSProperties = {
  backgroundColor: brand.surfaceRaised,
  border: `1px solid ${brand.border}`,
  borderRadius: "16px",
  padding: "28px 24px",
  margin: "0 0 28px",
  textAlign: "center" as const,
}

const iconBadge: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  padding: "12px 18px",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
  lineHeight: 0,
}

const ribbonText: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: brand.gold,
  margin: "0 0 14px",
}
