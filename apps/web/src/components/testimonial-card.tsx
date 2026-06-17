import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteDownIcon } from "@hugeicons/core-free-icons"
import { Card, CardContent } from "@workspace/ui/components/card"

export function TestimonialCard({ quote, name }: { quote: string; name: string }) {
  return (
    <Card className="border-none p-0 ring-1 ring-foreground/10">
      <CardContent className="flex flex-col gap-4 p-7">
        <HugeiconsIcon icon={QuoteDownIcon} className="size-6 text-[var(--flame-orange)]" />
        <p className="text-base leading-relaxed text-foreground normal-case font-sans italic">
          “{quote}”
        </p>
        <span className="font-heading text-sm font-semibold text-muted-foreground">— {name}</span>
      </CardContent>
    </Card>
  )
}
