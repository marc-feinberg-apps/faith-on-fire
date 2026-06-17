import { Card, CardContent } from "@workspace/ui/components/card"
import { SiteIcon } from "@/components/site-icon"
import type { SiteIconName } from "@/components/site-icon"

export function ResourceCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: SiteIconName
}) {
  return (
    <Card className="border-none p-0 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex flex-col gap-3 p-6">
        <span className="gradient-flame flex size-11 items-center justify-center rounded-xl text-white">
          <SiteIcon name={icon} className="size-5" />
        </span>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
