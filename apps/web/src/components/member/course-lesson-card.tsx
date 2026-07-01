import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlayIcon,
  Clock01Icon,
  LockIcon,
  Calendar03Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"

import { Card, CardContent } from "@workspace/ui/components/card"
import { courseThumbnailUrl } from "@/lib/supabase/storage"

export interface CourseLesson {
  number: number
  slug: string
  title: string
  subtitle: string
  duration: string
}

// Drip state for a single module tile, derived in the courses route from the
// user's unlock history:
//  - "unlocked"          → already unlocked; rewatchable anytime
//  - "available"         → the next module, and an unlock is available today
//  - "available-waiting" → the next module, but today's unlock was already used
//  - "locked"            → a later module, not yet reachable
export type CourseLessonState = "unlocked" | "available" | "available-waiting" | "locked"

interface CourseLessonCardProps {
  lesson: CourseLesson
  prevLesson?: CourseLesson
  state: CourseLessonState
  isUnlocking?: boolean
  onUnlock?: () => void
  onPlay?: () => void
}

// Splits "Pillar #1: Return to God | Module 1: The Drift" into
// { pillar: "Pillar #1: Return to God", module: "Module 1: The Drift" }.
// Titles without a pipe (intro / closing) return pillar: null.
export function parseTitleParts(title: string): { pillar: string | null; module: string } {
  const idx = title.indexOf(" | ")
  if (idx === -1) return { pillar: null, module: title }
  return { pillar: title.slice(0, idx), module: title.slice(idx + 3) }
}

// Builds a compact thumbnail chip label, e.g. "Pillar 1 · Module 1".
export function thumbnailLabel(title: string): string {
  const { pillar, module } = parseTitleParts(title)
  if (!pillar) return module  // "Welcome to Faith on Fire" / "Remain Connected"

  // "Pillar #1: Return to God" → "Pillar 1"
  const pillarMatch = pillar.match(/Pillar #(\d+)/)
  // "Module 1: The Drift" → "Module 1"
  const moduleMatch = module.match(/^(Module \d+)/)

  if (pillarMatch && moduleMatch) {
    return `Pillar ${pillarMatch[1]} · ${moduleMatch[1]}`
  }
  return module
}

// A single course "video" tile. Behaviour depends on `state`: unlocked tiles
// play (parent opens the player), the next tile offers an Unlock CTA (or a
// come-back-tomorrow note once the daily unlock is spent), and later tiles are
// shown locked so the path forward is always visible.
export function CourseLessonCard({
  lesson,
  prevLesson,
  state,
  isUnlocking = false,
  onUnlock,
  onPlay,
}: CourseLessonCardProps) {
  const isUnlocked = state === "unlocked"
  const isLocked = state === "locked" || state === "available-waiting"
  const { pillar, module } = parseTitleParts(lesson.title)

  return (
    <Card className="group overflow-hidden border-none p-0 ring-1 ring-foreground/10 transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <button
        type="button"
        disabled={state !== "unlocked" && state !== "available"}
        onClick={isUnlocked ? onPlay : state === "available" ? onUnlock : undefined}
        aria-label={
          isUnlocked
            ? `Play ${lesson.title}`
            : state === "available"
              ? `Unlock ${lesson.title}`
              : `${lesson.title} — locked`
        }
        className="gradient-ember relative flex aspect-video w-full items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-default"
      >
        <img
          src={courseThumbnailUrl(lesson.number)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
          onError={(e) => { (e.currentTarget).style.display = "none" }}
        />
        <div className={`absolute inset-0 ${isLocked ? "bg-black/60" : "bg-black/30"}`} />

        <span className="absolute left-3 top-3 inline-flex items-center justify-center rounded-full bg-black/40 px-2.5 py-1 font-heading text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          {thumbnailLabel(lesson.title)}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 font-heading text-[0.7rem] font-semibold text-white backdrop-blur-sm normal-case">
          <HugeiconsIcon icon={Clock01Icon} className="size-3" />
          {lesson.duration}
        </span>

        {isUnlocked ? (
          <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-[var(--fire-red)] shadow-lg transition-transform duration-200 group-hover:scale-110">
            <HugeiconsIcon icon={PlayIcon} className="size-6 translate-x-0.5" />
          </span>
        ) : state === "available" ? (
          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-heading text-sm font-semibold text-[var(--fire-red)] shadow-lg transition-transform duration-200 group-hover:scale-105 normal-case">
            <HugeiconsIcon
              icon={isUnlocking ? Loading03Icon : PlayIcon}
              className={isUnlocking ? "size-4 animate-spin" : "size-4"}
            />
            {isUnlocking ? "Unlocking…" : "Unlock Today's Module"}
          </span>
        ) : (
          <span className="relative flex flex-col items-center gap-2 px-4 text-center text-white">
            <HugeiconsIcon
              icon={state === "available-waiting" ? Calendar03Icon : LockIcon}
              className="size-7"
            />
            <span className="font-heading text-xs font-semibold normal-case">
              {state === "available-waiting"
                ? "Unlocks tomorrow"
                : prevLesson
                  ? `Unlocks after ${thumbnailLabel(prevLesson.title)}`
                  : "Locked"}
            </span>
          </span>
        )}
      </button>

      <CardContent className="flex flex-col gap-1.5 p-5">
        {pillar ? (
          <span className="font-heading text-[0.65rem] font-semibold tracking-[0.15em] text-[var(--fire-red)] uppercase">
            {pillar}
          </span>
        ) : null}
        <h3 className="text-base font-semibold leading-snug">{module}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          {lesson.subtitle}
        </p>
      </CardContent>
    </Card>
  )
}
