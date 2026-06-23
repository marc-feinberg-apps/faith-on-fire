import { Link, Text } from "@react-email/components"

import { CredentialsBox } from "../components/credentials-box"
import { CtaButton } from "../components/cta-button"
import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, paragraph } from "../components/text-styles"

export function PurchaseCredentialsEmail({
  productLabel,
  email,
  password,
  loginUrl,
}: {
  productLabel: string
  email: string
  password: string
  loginUrl: string
}) {
  return (
    <EmailLayout previewText={`Welcome to ${productLabel} — your login details`}>
      <IllustrationBox />
      <Text style={heading}>Welcome to {productLabel}!</Text>
      <Text style={paragraph}>Your account is ready.</Text>
      <CredentialsBox email={email} password={password} />
      <CtaButton label="Log in to Faith on Fire" url={loginUrl} />
      <Text style={{ ...paragraph, marginTop: "16px" }}>
        You can change your password any time from your{" "}
        <Link href={loginUrl} style={{ color: "inherit" }}>
          account page
        </Link>
        .
      </Text>
    </EmailLayout>
  )
}
