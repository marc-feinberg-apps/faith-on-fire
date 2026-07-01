import { Column, Img, Row, Text } from "@react-email/components"

import { brand } from "./brand"

export function HeroRow({
  tagline = "Ignite Your Faith. Transform Your Life. Impact The World.",
  headlineLines,
  accentLine,
  imageSrc,
  imageAlt,
}: {
  tagline?: string
  headlineLines: string[]
  accentLine?: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <Row style={{ margin: "0 0 28px" }}>
      <Column style={{ width: "340px", verticalAlign: "middle" as const }}>
        <Text style={taglineStyle}>{tagline}</Text>
        {headlineLines.map((line) => (
          <Text key={line} style={headlineTop}>
            {line}
          </Text>
        ))}
        {accentLine ? <Text style={headlineScript}>{accentLine}</Text> : null}
      </Column>
      <Column style={{ verticalAlign: "middle" as const, paddingLeft: "16px" }}>
        <Img
          src={imageSrc}
          alt={imageAlt}
          width="220"
          style={{ display: "block", width: "100%", maxWidth: "220px", borderRadius: "12px" }}
        />
      </Column>
    </Row>
  )
}

const taglineStyle: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
  margin: "0 0 14px",
}

const headlineTop: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "0.01em",
  textTransform: "uppercase" as const,
  color: brand.foreground,
  margin: "0",
  lineHeight: "36px",
}

const headlineScript: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "26px",
  color: brand.gold,
  margin: "4px 0 0",
  lineHeight: "32px",
}
