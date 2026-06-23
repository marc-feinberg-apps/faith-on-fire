import { HugeiconsIcon } from "@hugeicons/react"
import { PlayIcon, Clock01Icon } from "@hugeicons/core-free-icons"

import { Card, CardContent } from "@workspace/ui/components/card"

export interface CourseLesson {
  number: number
  slug: string
  title: string
  subtitle: string
  duration: string
}

// A single course "video" tile. The thumbnail is a placeholder (brand gradient
// with a play affordance) until real videos are wired in — clicking does nothing
// yet, so the whole card is a static, non-interactive preview for now.
export function CourseLessonCard({ lesson }: { lesson: CourseLesson }) {
  return (
    <Card className="group overflow-hidden border-none p-0 ring-1 ring-foreground/10 transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <div className="gradient-ember relative flex aspect-video items-center justify-center overflow-hidden">
        <span className="absolute left-3 top-3 inline-flex items-center justify-center rounded-full bg-black/30 px-2.5 py-1 font-heading text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          Module {lesson.number}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 font-heading text-[0.7rem] font-semibold text-white backdrop-blur-sm normal-case">
          <HugeiconsIcon icon={Clock01Icon} className="size-3" />
          {lesson.duration}
        </span>
        <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-[var(--fire-red)] shadow-lg transition-transform duration-200 group-hover:scale-110">
          <HugeiconsIcon icon={PlayIcon} className="size-6 translate-x-0.5" />
        </span>
      </div>
      <CardContent className="flex flex-col gap-1.5 p-5">
        <h3 className="text-lg leading-tight">{lesson.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          {lesson.subtitle}
        </p>
      </CardContent>
    </Card>
  )
}
