import { useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlayIcon,
  Clock01Icon,
  LockIcon,
  Calendar03Icon,
  Loading03Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"

import { Card, CardContent } from "@workspace/ui/components/card"
import { VideoPlayer } from "@/components/member/video-player"
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
  state: CourseLessonState
  isUnlocking?: boolean
  onUnlock?: () => void
  onPlay?: () => void
}

// A single course "video" tile. Behaviour depends on `state`: unlocked tiles
// play (parent opens the player), the next tile offers an Unlock CTA (or a
// come-back-tomorrow note once the daily unlock is spent), and later tiles are
// shown locked so the path forward is always visible.
export function CourseLessonCard({
  lesson,
  state,
  isUnlocking = false,
  onUnlock,
  onPlay,
}: CourseLessonCardProps) {
  const isUnlocked = state === "unlocked"
  const isLocked = state === "locked" || state === "available-waiting"

  return (
    <Card className="group overflow-hidden border-none p-0 ring-1 ring-foreground/10 transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <button
        type="button"
        disabled={state !== "unlocked" && state !== "available"}
        onClick={isUnlocked ? onPlay : state === "available" ? onUnlock : undefined}
        aria-label={
          isUnlocked
            ? `Play Module ${lesson.number}: ${lesson.title}`
            : state === "available"
              ? `Unlock Module ${lesson.number}: ${lesson.title}`
              : `Module ${lesson.number} locked`
        }
        className="gradient-ember relative flex aspect-video w-full items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-default"
      >
        <img
          src={courseThumbnailUrl(lesson.number)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
        />
        <div className={`absolute inset-0 ${isLocked ? "bg-black/60" : "bg-black/30"}`} />

        <span className="absolute left-3 top-3 inline-flex items-center justify-center rounded-full bg-black/30 px-2.5 py-1 font-heading text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          Module {lesson.number}
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
                : `Unlocks after Module ${lesson.number - 1}`}
            </span>
          </span>
        )}
      </button>

      <CardContent className="flex flex-col gap-1.5 p-5">
        <h3 className="text-lg leading-tight">{lesson.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          {lesson.subtitle}
        </p>
      </CardContent>
    </Card>
  )
}

interface CourseVideoModalProps {
  lesson: CourseLesson
  url: string | null
  isLoading: boolean
  error?: string
  onClose: () => void
}

// Lightweight, dependency-free player overlay (no Dialog component exists in the
// UI kit). Renders the freshly signed video URL with native controls; closes on
// backdrop click or Escape.
export function CourseVideoModal({ lesson, url, isLoading, error, onClose }: CourseVideoModalProps) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      // In fullscreen, let the browser/player handle Escape (exit fullscreen)
      // rather than tearing down the whole modal.
      if (event.key === "Escape" && !document.fullscreenElement) onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Module ${lesson.number}: ${lesson.title}`}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <div className="flex flex-col">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
              Module {lesson.number}
            </span>
            <h3 className="text-base leading-tight text-white">{lesson.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
          </button>
        </div>

        <div className="flex aspect-video w-full items-center justify-center bg-black">
          {url ? (
            <VideoPlayer src={url} />
          ) : (
            <div className="flex flex-col items-center gap-3 text-white/70">
              {isLoading ? (
                <>
                  <HugeiconsIcon icon={Loading03Icon} className="size-7 animate-spin" />
                  <span className="font-heading text-sm normal-case">Loading your lesson…</span>
                </>
              ) : (
                <span className="font-heading text-sm normal-case">
                  {error || "We couldn't load this video. Please try again."}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
