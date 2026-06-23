import { HugeiconsIcon } from "@hugeicons/react"
import { Video01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { mastermindSchedule } from "@/data/site"

// The headline card of the mastermind hub: the recurring weekly Zoom session and
// the one-tap join link. `zoomUrl` is delivered by a guarded server fn (members
// only); empty falls back to a reassuring "sent to your inbox" state.
export function ZoomCard({ zoomUrl }: { zoomUrl: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl gradient-fire p-8 text-white shadow-xl shadow-[var(--fire-red)]/25 sm:p-10">
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-heading text-xs font-semibold tracking-[0.18em] backdrop-blur-sm">
            <span className="size-2 animate-pulse rounded-full bg-[var(--sun-gold)]" />
            NEXT LIVE SESSION
          </span>
          <h2 className="text-3xl leading-[1.1] text-white sm:text-4xl">
            {mastermindSchedule.recurring}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/85 normal-case font-sans">
            {mastermindSchedule.duration} of teaching, brotherhood, and accountability.{" "}
            {mastermindSchedule.note}
          </p>
        </div>

        {zoomUrl ? (
          <a
            href={zoomUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-heading text-base font-semibold tracking-wide text-[var(--fire-red)] shadow-lg transition-all duration-200 hover:scale-[1.03] normal-case"
          >
            <HugeiconsIcon icon={Video01Icon} className="size-5" />
            Join the Zoom Room
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-4 font-heading text-base font-semibold tracking-wide text-white normal-case">
            <HugeiconsIcon icon={Video01Icon} className="size-5" />
            Link sent to your inbox
          </span>
        )}
      </div>
    </div>
  )
}
