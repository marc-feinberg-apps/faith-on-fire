import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, LockIcon, PlayIcon } from "@hugeicons/core-free-icons"

import { Badge } from "@workspace/ui/components/badge"
import { parseTitleParts, thumbnailLabel } from "@/components/member/course-lesson-card"
import type { CourseLesson } from "@/components/member/course-lesson-card"
import { courseThumbnailUrl } from "@/lib/supabase/storage"

interface CourseWatchRailProps {
  lessons: CourseLesson[]
  currentSlug: string
  unlocked: number[]
}

// The "up next" sidebar for the watch page: every lesson in module order, so
// the full path stays visible even for lessons the member hasn't reached yet.
// Unlocked lessons are real links; locked ones are shown but unclickable,
// matching the same "always show what's ahead" visual language as
// CourseLessonCard on the library grid.
export function CourseWatchRail({ lessons, currentSlug, unlocked }: CourseWatchRailProps) {
  return (
    <nav aria-label="Course lessons" className="lg:sticky lg:top-24 lg:self-start">
      <h2 className="mb-3 font-heading text-xs font-semibold tracking-[0.15em] text-muted-foreground">
        Course Lessons
      </h2>
      <ol className="flex flex-col gap-2">
        {lessons.map((lesson) => {
          const isCurrent = lesson.slug === currentSlug
          const isUnlocked = unlocked.includes(lesson.number)
          const { pillar, module } = parseTitleParts(lesson.title)

          return (
            <li key={lesson.slug}>
              <RailRow
                lesson={lesson}
                pillar={pillar}
                module={module}
                isCurrent={isCurrent}
                isUnlocked={isUnlocked}
              />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

interface RailRowProps {
  lesson: CourseLesson
  pillar: string | null
  module: string
  isCurrent: boolean
  isUnlocked: boolean
}

function RailRow({ lesson, pillar, module, isCurrent, isUnlocked }: RailRowProps) {
  const thumbnail = (
    <span className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-black sm:w-32">
      <img
        src={courseThumbnailUrl(lesson.number)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        onError={(e) => { (e.currentTarget).style.display = "none" }}
      />
      <span className={`absolute inset-0 ${isUnlocked ? "bg-black/20" : "bg-black/60"}`} />
      {isCurrent ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <HugeiconsIcon icon={PlayIcon} className="size-5 text-white" />
        </span>
      ) : !isUnlocked ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <HugeiconsIcon icon={LockIcon} className="size-4 text-white/90" />
        </span>
      ) : null}
      <span className="absolute bottom-1 right-1 inline-flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5 font-heading text-[0.6rem] font-semibold text-white normal-case">
        <HugeiconsIcon icon={Clock01Icon} className="size-2.5" />
        {lesson.duration}
      </span>
    </span>
  )

  const label = (
    <span className="flex min-w-0 flex-col gap-1">
      {pillar ? (
        <span className="truncate font-heading text-[0.6rem] font-semibold tracking-[0.12em] text-[var(--fire-red)] uppercase">
          {thumbnailLabel(lesson.title)}
        </span>
      ) : (
        <span className="truncate font-heading text-[0.6rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          {thumbnailLabel(lesson.title)}
        </span>
      )}
      <span className={`line-clamp-2 text-sm font-semibold leading-snug ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
        {module}
      </span>
      {isCurrent ? (
        <Badge className="w-fit gradient-fire border-none px-2 py-0 text-[0.6rem] font-semibold tracking-wide text-white">
          Now Playing
        </Badge>
      ) : null}
    </span>
  )

  const rowClasses = "flex items-start gap-3 rounded-xl p-1.5 transition-colors"

  if (isCurrent) {
    return (
      <Link
        to="/courses/$slug"
        params={{ slug: lesson.slug }}
        aria-label={`Now playing: ${lesson.title}`}
        className={`${rowClasses} ring-2 ring-[var(--fire-red)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50`}
      >
        {thumbnail}
        {label}
      </Link>
    )
  }

  if (isUnlocked) {
    return (
      <Link
        to="/courses/$slug"
        params={{ slug: lesson.slug }}
        aria-label={`Play ${lesson.title}`}
        className={`${rowClasses} hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50`}
      >
        {thumbnail}
        {label}
      </Link>
    )
  }

  return (
    <div aria-disabled="true" aria-label={`${lesson.title} — locked`} className={`${rowClasses} opacity-60`}>
      {thumbnail}
      {label}
    </div>
  )
}
