import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, ArrowRight01Icon, Clock01Icon } from "@hugeicons/core-free-icons"

import { Card, CardContent } from "@workspace/ui/components/card"
import { consultation } from "@/data/site"

// Compact, reusable card offering the free 15-minute consultation call with Marc.
// `calendlyUrl` comes from a guarded server fn — when it's empty (env not set yet)
// we show a graceful "coming soon" state instead of a dead link.
export function ConsultationCard({ calendlyUrl }: { calendlyUrl: string }) {
  return (
    <Card className="overflow-hidden border-none p-0 ring-1 ring-foreground/10">
      <CardContent className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-start gap-4">
          <span className="gradient-fire flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-[var(--fire-red)]/25">
            <HugeiconsIcon icon={Calendar03Icon} className="size-6" />
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--fire-red)]">
              {consultation.eyebrow}
            </span>
            <h3 className="text-xl leading-tight">{consultation.title}</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
              {consultation.description}
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 font-heading text-xs font-semibold tracking-wide text-foreground/60 normal-case">
              <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
              15 minutes · free for members
            </span>
          </div>
        </div>

        {calendlyUrl ? (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="group gradient-fire inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-semibold tracking-wide text-white shadow-lg shadow-[var(--fire-red)]/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl normal-case"
          >
            {consultation.ctaLabel}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-foreground/15 px-7 py-3.5 font-heading text-sm font-semibold tracking-wide text-muted-foreground normal-case">
            Booking opens soon
          </span>
        )}
      </CardContent>
    </Card>
  )
}
