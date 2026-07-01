import {
  Body,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

import { brand } from "./brand"
import { SITE_URL } from "./urls"

const footerNavLinks = [
  { label: "Ebook", href: `${SITE_URL}/ebook` },
  { label: "Course", href: `${SITE_URL}/course` },
  { label: "Mastermind", href: `${SITE_URL}/mastermind` },
]

const lightTheme = {
  bg: "#FAF8F4",
  card: "#FFFFFF",
  border: "#DED6CE",
  foreground: "#171311",
  mutedForeground: "#625650",
  accent: "#CE2309",
}

export function EmailLayout({
  previewText,
  footerVariant = "transactional",
  theme = "dark",
  children,
}: {
  previewText: string
  footerVariant?: "transactional" | "marketing"
  theme?: "dark" | "light"
  children: React.ReactNode
}) {
  const isLight = theme === "light"
  const bg = isLight ? lightTheme.bg : brand.bgDark
  const cardBg = isLight ? lightTheme.card : brand.surfaceDark
  const border = isLight ? lightTheme.border : brand.border
  const mutedText = isLight ? lightTheme.mutedForeground : brand.mutedForeground
  const accent = isLight ? lightTheme.accent : brand.gold

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Oswald"
          fallbackFontFamily={["Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZosUZiZQ.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={{ ...main, backgroundColor: bg }}>
        <div style={{ ...gradientBar, backgroundImage: `linear-gradient(90deg, ${brand.goldLight}, ${brand.gold})` }} />
        <Section style={{ ...header, backgroundColor: isLight ? lightTheme.bg : brand.bgDark }}>
          <table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto" }}>
            <tr>
              <td style={logoBadge}>
                <Img
                  src={`${SITE_URL}/assets/brand/faith-on-fire-logo-white.png`}
                  alt="Faith on Fire"
                  width="130"
                  height="67"
                  style={{ display: "block" }}
                />
              </td>
            </tr>
          </table>
        </Section>
        <Container style={cardOuter}>
          <Section style={{ ...card, backgroundColor: cardBg, border: `1px solid ${border}` }}>{children}</Section>
        </Container>
        <Section style={{ ...footer, backgroundColor: bg }}>
          <Text style={{ ...footerText, color: mutedText }}>
            Faith on Fire &middot; Helping Men Return To God, Restore Relationships &amp; Reignite
            Their Purpose
          </Text>
          <Text style={{ ...footerText, color: mutedText }}>
            Questions? Reach out anytime at{" "}
            <Link href="mailto:support@faithonfire.world" style={{ color: accent, textDecoration: "underline" }}>
              support@faithonfire.world
            </Link>
          </Text>
          <Hr style={{ ...footerHr, borderColor: border }} />
          <table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto 12px" }}>
            <tr>
              {footerNavLinks.map((link, index) => (
                <td key={link.href} style={{ padding: index === 0 ? "0" : "0 0 0 16px" }}>
                  <Link href={link.href} style={{ ...footerNavLink, color: accent }}>
                    {link.label}
                  </Link>
                </td>
              ))}
            </tr>
          </table>
          <Text style={{ ...footerMuted, color: mutedText }}>
            You're receiving this because you joined Faith on Fire at{" "}
            <Link href={SITE_URL} style={{ color: accent, textDecoration: "underline" }}>
              faithonfire.world
            </Link>
            .
          </Text>
          {footerVariant === "marketing" ? (
            <Text style={{ ...footerMuted, color: mutedText }}>
              Don't want these emails?{" "}
              <Link
                href={`mailto:support@faithonfire.world?subject=Unsubscribe`}
                style={{ color: accent, textDecoration: "underline" }}
              >
                Unsubscribe
              </Link>
              .
            </Text>
          ) : null}
          <Text style={{ ...footerCopyright, color: mutedText }}>
            &copy; {new Date().getFullYear()} Faith on Fire. All rights reserved.
          </Text>
        </Section>
      </Body>
    </Html>
  )
}

const main: React.CSSProperties = {
  fontFamily: brand.fontBody,
  margin: 0,
  padding: 0,
}

const gradientBar: React.CSSProperties = {
  height: "4px",
}

const header: React.CSSProperties = {
  padding: "28px 24px",
  textAlign: "center" as const,
}

const logoBadge: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "14px 20px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
  lineHeight: 0,
}

const cardOuter: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "32px 24px",
}

const card: React.CSSProperties = {
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
}

const footer: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 24px 40px",
  textAlign: "center" as const,
}

const footerText: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
  margin: "4px 0",
}

const footerMuted: React.CSSProperties = {
  ...footerText,
  fontSize: "12px",
}

const footerHr: React.CSSProperties = {
  margin: "16px 0",
}

const footerNavLink: React.CSSProperties = {
  fontFamily: brand.fontDisplay,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
}

const footerCopyright: React.CSSProperties = {
  ...footerMuted,
  margin: "16px 0 0",
}
