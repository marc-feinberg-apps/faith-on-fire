import { Text } from "@react-email/components"

import { CtaButton } from "../components/cta-button"
import { IllustrationBox } from "../components/illustration"
import { EmailLayout } from "../components/layout"
import { heading, paragraph, strong } from "../components/text-styles"

export function MastermindZoomEmail({ zoomUrl }: { zoomUrl: string }) {
  return (
    <EmailLayout previewText="Your weekly Mastermind call — save the time">
      <IllustrationBox />
      <Text style={heading}>Your weekly Mastermind call</Text>
      <Text style={paragraph}>
        The Mastermind meets <span style={strong}>every Saturday at 10:00 AM ET for 90 minutes</span>{" "}
        on Zoom. Same link every week — bookmark it.
      </Text>
      {zoomUrl ? (
        <CtaButton label="Join the Zoom Call" url={zoomUrl} />
      ) : (
        <Text style={paragraph}>
          We'll send the Zoom link separately — keep an eye on your inbox.
        </Text>
      )}
    </EmailLayout>
  )
}
