import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import { Section, Text } from "@react-email/components"

import { brand } from "./brand"

export function IllustrationBox({
  icon,
  ribbon,
}: {
  icon: IconSvgElement
  ribbon?: string
}) {
  return (
    <Section style={box}>
      {ribbon ? <Text style={ribbonText}>{ribbon}</Text> : null}
      <table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto" }}>
        <tr>
          <td style={badge}>
            <HugeiconsIcon icon={icon} size={36} color="#FFFFFF" strokeWidth={2} />
          </td>
        </tr>
      </table>
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

const badge: React.CSSProperties = {
  backgroundImage: `linear-gradient(135deg, ${brand.flameOrange}, ${brand.fireRed})`,
  borderRadius: "9999px",
  width: "72px",
  height: "72px",
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
  boxShadow: `0 8px 20px rgba(206, 35, 9, 0.3)`,
}
