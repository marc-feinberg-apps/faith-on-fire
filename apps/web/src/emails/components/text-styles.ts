import { brand } from "./brand"

export const heading: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
  color: brand.foreground,
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
  color: brand.gold,
}

export const label: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: brand.mutedForeground,
  margin: "0 0 2px",
}

export const value: React.CSSProperties = {
  fontFamily: brand.fontBody,
  fontSize: "15px",
  color: brand.foreground,
  margin: "0 0 8px",
}

export const credentialLabel: React.CSSProperties = {
  ...label,
}

export const credentialValue: React.CSSProperties = {
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: "15px",
  fontWeight: 700,
  color: brand.gold,
  backgroundColor: brand.bgDark,
  padding: "4px 8px",
  borderRadius: "6px",
  display: "inline-block",
}
