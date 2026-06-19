import { Card, CardContent } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import type { pillars } from "@/data/site"

const accentByIndex = ["gradient-fire", "gradient-flame", "gradient-flame", "gradient-ember"]

export function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number]
  index: number
}) {
  return (
    <Card className="group relative overflow-hidden border-none p-0 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-2xl">
      <div className={cn("h-1.5 w-full", accentByIndex[index % accentByIndex.length])} />
      <CardContent className="flex flex-col gap-3 p-7">
        <span className="font-heading text-sm font-semibold text-[var(--fire-red)] tracking-[0.2em]">
          0{index + 1}
        </span>
        <h3 className="text-2xl">{pillar.title}</h3>
        <p className="text-sm font-semibold text-muted-foreground normal-case">{pillar.subtitle}</p>
        <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          {pillar.description}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-foreground/60 normal-case font-sans italic">
          {pillar.verse}
        </p>
      </CardContent>
    </Card>
  )
}
