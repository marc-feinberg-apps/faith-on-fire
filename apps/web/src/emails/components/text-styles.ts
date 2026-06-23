import { brand } from "./brand"

export const heading: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
  color: brand.fireRed,
  margin: "0 0 16px",
  lineHeight: "32px",
}

export const paragraph: React.CSSProperties = {
  fontFamily: brand.fontBody,
  fontSize: "16px",
  lineHeight: "26px",
  color: brand.foreground,
  margin: "0 0 16px",
}

export const strong: React.CSSProperties = {
  color: brand.fireRed,
}
