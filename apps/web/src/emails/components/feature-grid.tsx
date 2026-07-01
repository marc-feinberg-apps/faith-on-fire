import { Column, Img, Row, Section, Text } from "@react-email/components"

import { brand } from "./brand"
import { EMAIL_ASSETS_URL } from "./urls"

export function FeatureGrid({
  items,
}: {
  items: { icon?: string; title: string; description: string }[]
}) {
  const columnWidth = `${Math.floor(100 / items.length)}%`

  return (
    <Section style={{ margin: "24px 0 0" }}>
      <Row>
        {items.map((item) => (
          <Column key={item.title} style={{ ...column, width: columnWidth }}>
            {item.icon ? (
              <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto 10px" }}>
                <tr>
                  <td style={iconBadge}>
                    <Img
                      src={`${EMAIL_ASSETS_URL}/${item.icon}`}
                      alt={item.title}
                      width="30"
                      height="30"
                      style={{ display: "block", margin: "0 auto" }}
                    />
                  </td>
                </tr>
              </table>
            ) : (
              <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto 10px" }}>
                <tr>
                  <td style={iconFallback} />
                </tr>
              </table>
            )}
            <Text style={title}>{item.title}</Text>
            <Text style={description}>{item.description}</Text>
          </Column>
        ))}
      </Row>
    </Section>
  )
}

const column: React.CSSProperties = {
  padding: "0 6px",
  textAlign: "center" as const,
  verticalAlign: "top" as const,
}

const iconBadge: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  backgroundColor: brand.foreground,
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
}

const iconFallback: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "9999px",
  backgroundColor: brand.gold,
}

const title: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  color: brand.gold,
  margin: "0 0 6px",
}

const description: React.CSSProperties = {
  fontFamily: brand.fontBody,
  fontSize: "12px",
  lineHeight: "17px",
  color: brand.mutedForeground,
  margin: 0,
}
