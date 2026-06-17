import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserGroup03Icon,
  BookOpen01Icon,
  Edit02Icon,
  HandPrayerIcon,
  Book02Icon,
  Target01Icon,
  HeartHandshakeIcon,
  CheckmarkCircle02Icon,
  Book01Icon,
  Chat01Icon,
  Idea01Icon,
  Compass01Icon,
} from "@hugeicons/core-free-icons"

const iconMap = {
  UserGroup03Icon,
  BookOpen01Icon,
  Edit02Icon,
  HandPrayerIcon,
  Book02Icon,
  Target01Icon,
  HeartHandshakeIcon,
  CheckmarkCircle02Icon,
  Book01Icon,
  Chat01Icon,
  Idea01Icon,
  Compass01Icon,
}

export type SiteIconName = keyof typeof iconMap

export function SiteIcon({
  name,
  className,
}: {
  name: SiteIconName
  className?: string
}) {
  return <HugeiconsIcon icon={iconMap[name]} className={className} strokeWidth={1.75} />
}
