import { createFileRoute, redirect, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

import { SectionHeading } from "@/components/section-heading"
import { CourseLessonCard } from "@/components/member/course-lesson-card"
import { ConsultationCard } from "@/components/member/consultation-card"
import { getCourseArea } from "@/server/member"
import { courseLessons } from "@/data/site"

export const Route = createFileRoute("/_authenticated/courses")({
  // Strict per-product gate: course content requires an active course purchase.
  beforeLoad: ({ context }) => {
    if (!context.access.hasCourse) {
      throw redirect({ to: "/course" })
    }
  },
  loader: () => getCourseArea(),
  head: () => ({
    meta: [{ title: "Your Course | Faith on Fire" }],
  }),
  component: CoursesPage,
})

function CoursesPage() {
  const area = Route.useLoaderData()
  const calendlyUrl = area?.calendlyUrl ?? ""

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 gradient-warm" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold tracking-wide text-foreground/60 transition-colors hover:text-[var(--fire-red)] normal-case"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            Dashboard
          </Link>
          <div className="mt-4 flex flex-col gap-2">
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
              The Faith on Fire Course · 10 Modules
            </span>
            <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">
              Your Course Library
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground normal-case font-sans">
              Every module is yours to keep. Watch at your own pace, then take the work into your
              week. Your breakthrough is in the work.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courseLessons.map((lesson) => (
            <CourseLessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <SectionHeading
          eyebrow="Go Deeper"
          title="Stuck on a module? Talk it through with Marc."
          align="left"
        />
        <div className="mt-8">
          <ConsultationCard calendlyUrl={calendlyUrl} />
        </div>
      </section>
    </div>
  )
}
