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

const SITE_URL = "https://www.faithonfire.world"

export function EmailLayout({
  previewText,
  children,
}: {
  previewText: string
  children: React.ReactNode
}) {
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
      <Body style={main}>
        <div style={gradientBar} />
        <Section style={header}>
          <Img
            src={`${SITE_URL}/assets/brand/faith-on-fire-logo-white.png`}
            alt="Faith on Fire"
            width="180"
            style={{ margin: "0 auto" }}
          />
        </Section>
        <Container style={cardOuter}>
          <Section style={card}>{children}</Section>
        </Container>
        <Section style={footer}>
          <Text style={footerText}>
            Faith on Fire &middot; Helping Men Return To God, Restore Relationships &amp; Reignite
            Their Purpose
          </Text>
          <Text style={footerText}>
            Questions? Reach out anytime at{" "}
            <Link href="mailto:support@faithonfire.world" style={footerLink}>
              support@faithonfire.world
            </Link>
          </Text>
          <Hr style={footerHr} />
          <Text style={footerMuted}>
            You're receiving this because you joined Faith on Fire at{" "}
            <Link href={SITE_URL} style={footerLink}>
              faithonfire.world
            </Link>
            .
          </Text>
        </Section>
      </Body>
    </Html>
  )
}

const main: React.CSSProperties = {
  backgroundColor: brand.warmCream,
  fontFamily: brand.fontBody,
  margin: 0,
  padding: 0,
}

const gradientBar: React.CSSProperties = {
  height: "4px",
  backgroundImage: `linear-gradient(90deg, ${brand.fireRed}, ${brand.flameOrange}, ${brand.sunGold})`,
}

const header: React.CSSProperties = {
  backgroundColor: brand.emberDark,
  padding: "28px 24px",
  textAlign: "center" as const,
}

const cardOuter: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "32px 24px",
}

const card: React.CSSProperties = {
  backgroundColor: brand.card,
  border: `1px solid ${brand.border}`,
  borderRadius: "20px",
  padding: "40px",
}

const footer: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 24px 40px",
  textAlign: "center" as const,
}

const footerText: React.CSSProperties = {
  color: brand.mutedForeground,
  fontSize: "13px",
  lineHeight: "20px",
  margin: "4px 0",
}

const footerMuted: React.CSSProperties = {
  ...footerText,
  fontSize: "12px",
}

const footerLink: React.CSSProperties = {
  color: brand.fireRed,
  textDecoration: "underline",
}

const footerHr: React.CSSProperties = {
  borderColor: brand.border,
  margin: "16px 0",
}
