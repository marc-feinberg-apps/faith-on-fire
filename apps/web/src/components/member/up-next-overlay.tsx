import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, PlayIcon } from "@hugeicons/core-free-icons"

import { parseTitleParts, thumbnailLabel } from "@/components/member/course-lesson-card"
import type { CourseLesson } from "@/components/member/course-lesson-card"
import { courseThumbnailUrl } from "@/lib/supabase/storage"

interface UpNextOverlayProps {
  nextLesson: CourseLesson
  secondsRemaining: number
  onCancel: () => void
  onPlayNow: () => void
}

// A brief, dismissible YouTube-style "up next" card shown over the player
// once a video ends. Announced politely for screen readers, but nothing here
// steals keyboard focus — the countdown auto-navigates on its own, so forcing
// focus onto it would be surprising for anyone not looking at the player.
export function UpNextOverlay({ nextLesson, secondsRemaining, onCancel, onPlayNow }: UpNextOverlayProps) {
  const { module } = parseTitleParts(nextLesson.title)

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute bottom-4 right-4 z-10 w-60 rounded-xl bg-black/90 p-3 text-white shadow-xl ring-1 ring-white/10 backdrop-blur-sm sm:bottom-6 sm:right-6 sm:w-64"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-heading text-[0.65rem] font-semibold tracking-wide text-white/70 normal-case">
          Playing next in {secondsRemaining}s
        </span>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel autoplay"
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        <span className="relative block aspect-video w-16 shrink-0 overflow-hidden rounded-md bg-black">
          <img
            src={courseThumbnailUrl(nextLesson.number)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            onError={(e) => { (e.currentTarget).style.display = "none" }}
          />
          <span className="absolute inset-0 bg-black/20" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate font-heading text-[0.6rem] font-semibold tracking-[0.1em] text-[var(--sun-gold)] uppercase">
            {thumbnailLabel(nextLesson.title)}
          </span>
          <span className="line-clamp-2 text-xs font-semibold leading-snug text-white">{module}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlayNow}
        className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-heading text-xs font-semibold text-[var(--fire-red)] transition-transform hover:scale-[1.02] normal-case"
      >
        <HugeiconsIcon icon={PlayIcon} className="size-3.5" />
        Play now
      </button>
    </div>
  )
}
