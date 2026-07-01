import { Img, Section, Text } from "@react-email/components"

import { brand } from "../components/brand"
import { CtaButton } from "../components/cta-button"
import { EmailLayout } from "../components/layout"
import { StatCircle } from "../components/stat-circle"
import { heading, paragraph, strong } from "../components/text-styles"
import { MASTERMIND_ZOOM_PHOTO_URL } from "../components/urls"

export function MastermindZoomEmail({ zoomUrl }: { zoomUrl: string }) {
  return (
    <EmailLayout previewText="Your weekly Mastermind call — save the time">
      <Text style={heading}>Your weekly Mastermind call</Text>

      <Section style={card}>
        <table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto" }}>
          <tr>
            <td style={{ verticalAlign: "middle" as const }}>
              <StatCircle value="SAT" label="10 AM" size={90} />
            </td>
            <td style={{ verticalAlign: "middle" as const, paddingLeft: "16px" }}>
              <Img
                src={MASTERMIND_ZOOM_PHOTO_URL}
                alt="The Faith on Fire Mastermind weekly Zoom call"
                width="180"
                style={{ display: "block", width: "180px", borderRadius: "10px" }}
              />
            </td>
          </tr>
        </table>
      </Section>

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

const card: React.CSSProperties = {
  backgroundColor: brand.surfaceRaised,
  border: `1px solid ${brand.border}`,
  borderRadius: "16px",
  padding: "20px",
  margin: "0 0 20px",
}
