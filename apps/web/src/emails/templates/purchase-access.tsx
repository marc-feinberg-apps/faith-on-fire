import { LockKeyIcon } from "@hugeicons/core-free-icons"
import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, paragraph } from "../components/text-styles"

export function PurchaseAccessEmail({
  productLabel,
  loginUrl,
}: {
  productLabel: string
  loginUrl: string
}) {
  return (
    <EmailLayout previewText={`You now have access to ${productLabel}`}>
      <IllustrationBox icon={LockKeyIcon} />
      <Text style={heading}>You now have access to {productLabel}</Text>
      <Text style={paragraph}>Log in with your existing account to get started.</Text>
      <CtaButton label="Log in to Faith on Fire" url={loginUrl} />
    </EmailLayout>
  )
}
