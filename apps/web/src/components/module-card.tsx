import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import type { blueprintModules } from "@/data/site"

export function ModuleCard({ module }: { module: (typeof blueprintModules)[number] }) {
  return (
    <Card className="border-none p-0 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex flex-col gap-4 p-7">
        <div className="flex items-center justify-between">
          <span className="gradient-fire flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white">
            {module.number}
          </span>
          {module.pillar ? (
            <Badge variant="outline" className="normal-case">
              {module.pillar}
            </Badge>
          ) : null}
        </div>
        <div>
          <h3 className="text-xl">{module.title}</h3>
          <p className="mt-1 text-sm font-semibold text-muted-foreground normal-case">
            {module.subtitle}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          {module.keyTeaching}
        </p>
        <div className="mt-1 space-y-2 rounded-lg bg-muted/60 p-4 text-sm normal-case font-sans">
          <p>
            <span className="font-heading text-xs font-semibold tracking-wide text-[var(--fire-red)]">
              Reflection Questions
            </span>{" "}
            <span className="text-foreground/80">{module.reflectionPreview}</span>
          </p>
          <p>
            <span className="font-heading text-xs font-semibold tracking-wide text-[var(--fire-red)]">
              Declaration
            </span>{" "}
            <span className="text-foreground/80">{module.declaration}</span>
          </p>
          <p>
            <span className="font-heading text-xs font-semibold tracking-wide text-[var(--fire-red)]">
              This Week&apos;s Action Step
            </span>{" "}
            <span className="text-foreground/80">{module.actionStep}</span>
          </p>
          <p>
            <span className="font-heading text-xs font-semibold tracking-wide text-[var(--fire-red)]">
              Workbook Tool
            </span>{" "}
            <span className="text-foreground/80">
              {module.tool}: {module.toolDescription}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
