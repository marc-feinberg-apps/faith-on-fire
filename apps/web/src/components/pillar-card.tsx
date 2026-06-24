import { Card, CardContent } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { pillarImageUrl, type pillars } from "@/data/site"

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
      <div className="relative aspect-[3/1] w-full overflow-hidden">
        <img
          src={pillarImageUrl}
          alt=""
          className="h-full w-full object-cover object-[50%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute bottom-2 left-3 font-heading text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          0{index + 1}
        </span>
      </div>
      <CardContent className="flex flex-col gap-3 p-7">
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
