import { Link, Text } from "@react-email/components"

import { brand } from "../components/brand"
import { CtaButton } from "../components/cta-button"
import { EmailLayout } from "../components/layout"
import { heading, paragraph, strong } from "../components/text-styles"

export function CoachingCallEmail({
  calendlyUrl,
  supportEmail,
}: {
  calendlyUrl: string
  supportEmail: string
}) {
  return (
    <EmailLayout previewText="Got 15 minutes? Let's talk.">
      <Text style={heading}>Got 15 minutes? Let's talk.</Text>
      <Text style={paragraph}>
        As part of your membership, you get a{" "}
        <span style={strong}>free 15-minute coaching call with Marc</span> — a chance to talk
        through where you're at and get pointed in the right direction.
      </Text>
      {calendlyUrl ? (
        <CtaButton label="Book Your Free Call" url={calendlyUrl} />
      ) : (
        <Text style={paragraph}>
          Reach out to{" "}
          <Link href={`mailto:${supportEmail}`} style={{ color: brand.fireRed }}>
            {supportEmail}
          </Link>{" "}
          to schedule yours.
        </Text>
      )}
    </EmailLayout>
  )
}
