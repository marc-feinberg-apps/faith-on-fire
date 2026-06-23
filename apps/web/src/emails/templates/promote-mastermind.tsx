import { UserGroup03Icon } from "@hugeicons/core-free-icons"
import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, paragraph, strong } from "../components/text-styles"

export function PromoteMastermindEmail({ mastermindUrl }: { mastermindUrl: string }) {
  return (
    <EmailLayout previewText="You don't have to do this alone" footerVariant="marketing">
      <IllustrationBox icon={UserGroup03Icon} />
      <Text style={heading}>You don't have to do this alone</Text>
      <Text style={paragraph}>
        The <span style={strong}>Faith on Fire Mastermind</span> is a standing weekly brotherhood:
        men showing up, telling the truth, and getting sharpened together.
      </Text>
      <CtaButton label="See the Mastermind" url={mastermindUrl} />
    </EmailLayout>
  )
}
