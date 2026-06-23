import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
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
      <Text style={heading}>You now have access to {productLabel}</Text>
      <Text style={paragraph}>Log in with your existing account to get started.</Text>
      <CtaButton label="Log in to Faith on Fire" url={loginUrl} />
    </EmailLayout>
  )
}
