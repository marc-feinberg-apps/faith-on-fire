import { Img, Text } from "@react-email/components"

import { brand } from "./brand"

export function StatCircle({
  src,
  alt,
  size = 120,
  value,
  label,
}: {
  src?: string
  alt?: string
  size?: number
  value?: string
  label?: string
}) {
  if (src) {
    const badgeSize = size + 16
    return (
      <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
        <tr>
          <td
            style={{
              width: `${badgeSize}px`,
              height: `${badgeSize}px`,
              borderRadius: "9999px",
              backgroundColor: brand.foreground,
              textAlign: "center" as const,
              verticalAlign: "middle" as const,
            }}
          >
            <Img
              src={src}
              alt={alt ?? ""}
              width={String(size)}
              height={String(size)}
              style={{ display: "block", margin: "0 auto" }}
            />
          </td>
        </tr>
      </table>
    )
  }

  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
      <tr>
        <td
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "9999px",
            border: `2px solid ${brand.gold}`,
            backgroundColor: brand.surfaceRaised,
            textAlign: "center" as const,
            verticalAlign: "middle" as const,
          }}
        >
          {value ? <Text style={valueText}>{value}</Text> : null}
          {label ? <Text style={labelText}>{label}</Text> : null}
        </td>
      </tr>
    </table>
  )
}

const valueText: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "26px",
  fontWeight: 700,
  color: brand.gold,
  margin: "0",
  lineHeight: "30px",
}

const labelText: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
  margin: "0",
}
