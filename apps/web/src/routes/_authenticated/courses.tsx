import { useState } from "react"
import { createFileRoute, redirect, Link } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, Calendar03Icon, CheckmarkCircle02Icon, Download04Icon } from "@hugeicons/core-free-icons"

import { SectionHeading } from "@/components/section-heading"
import { CourseLessonCard, CourseVideoModal } from "@/components/member/course-lesson-card"
import type { CourseLesson, CourseLessonState } from "@/components/member/course-lesson-card"
import { ConsultationCard } from "@/components/member/consultation-card"
import {
  getCourseArea,
  getCourseLibrary,
  unlockNextModule,
  getCourseVideoUrl,
  getWorkbookDownloadUrl,
} from "@/server/member"
import type { CourseLibraryState } from "@/server/member"
import { courseLessons } from "@/data/site"

const WORKBOOK_DOWNLOADED_KEY = "fof:workbook-downloaded"

export const Route = createFileRoute("/_authenticated/courses")({
  // Strict per-product gate: course content requires an active course purchase.
  beforeLoad: ({ context }) => {
    if (!context.access.hasCourse) {
      throw redirect({ to: "/course" })
    }
  },
  loader: async () => {
    const [area, library] = await Promise.all([getCourseArea(), getCourseLibrary()])
    return { area, library }
  },
  head: () => ({
    meta: [{ title: "Your Course | Faith on Fire" }],
  }),
  component: CoursesPage,
})

function lessonState(number: number, library: CourseLibraryState): CourseLessonState {
  if (library.unlocked.includes(number)) return "unlocked"
  if (library.nextModule === number) return library.canUnlockToday ? "available" : "available-waiting"
  return "locked"
}

function CoursesPage() {
  const { area, library: initialLibrary } = Route.useLoaderData()
  const calendlyUrl = area?.calendlyUrl ?? ""

  const refetchLibrary = useServerFn(getCourseLibrary)
  const unlock = useServerFn(unlockNextModule)
  const getVideoUrl = useServerFn(getCourseVideoUrl)
  const fetchWorkbookUrl = useServerFn(getWorkbookDownloadUrl)

  const [library, setLibrary] = useState<CourseLibraryState>(
    initialLibrary ?? { unlocked: [], nextModule: 1, canUnlockToday: true },
  )
  const [unlockingModule, setUnlockingModule] = useState<number | null>(null)
  const [unlockError, setUnlockError] = useState("")
  const [workbookLoading, setWorkbookLoading] = useState(false)
  const [workbookDownloaded, setWorkbookDownloaded] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem(WORKBOOK_DOWNLOADED_KEY),
  )

  // Active video player state.
  const [playing, setPlaying] = useState<CourseLesson | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoLoading, setVideoLoading] = useState(false)
  const [videoError, setVideoError] = useState("")

  async function handleUnlock(lesson: CourseLesson) {
    setUnlockError("")
    setUnlockingModule(lesson.number)
    try {
      const result = await unlock()
      if (result.ok) {
        // Re-read authoritative state (unlocked set + today's daily flag).
        const fresh = await refetchLibrary()
        if (fresh) setLibrary(fresh)
      } else {
        setUnlockError(
          result.reason === "daily-limit"
            ? "You've unlocked today's module. Come back tomorrow for the next one."
            : "We couldn't unlock this module. Please try again.",
        )
      }
    } catch {
      setUnlockError("We couldn't unlock this module. Please try again.")
    } finally {
      setUnlockingModule(null)
    }
  }

  async function handlePlay(lesson: CourseLesson) {
    setPlaying(lesson)
    setVideoUrl(null)
    setVideoError("")
    setVideoLoading(true)
    try {
      const result = await getVideoUrl({ data: { module: lesson.number } })
      if (result.url) {
        setVideoUrl(result.url)
      } else {
        setVideoError("We couldn't load this video. Please try again.")
      }
    } catch {
      setVideoError("We couldn't load this video. Please try again.")
    } finally {
      setVideoLoading(false)
    }
  }

  function closePlayer() {
    setPlaying(null)
    setVideoUrl(null)
    setVideoError("")
  }

  async function handleWorkbookDownload() {
    setWorkbookLoading(true)
    try {
      const result = await fetchWorkbookUrl()
      if (result?.url) {
        window.open(result.url, "_blank", "noopener")
        localStorage.setItem(WORKBOOK_DOWNLOADED_KEY, "1")
        setWorkbookDownloaded(true)
      }
    } finally {
      setWorkbookLoading(false)
    }
  }

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
              The Faith on Fire Course · 11 Modules
            </span>
            <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">
              Your Course Library
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground normal-case font-sans">
              One module unlocks each day — this is on purpose. Don't rush it. Watch today's module,
              then take the work into your week. Your breakthrough is in the work.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <button
          type="button"
          onClick={handleWorkbookDownload}
          disabled={workbookLoading}
          className={`mb-6 w-full flex items-center gap-3 rounded-2xl px-5 py-4 ring-1 text-left transition-colors disabled:opacity-60 cursor-pointer ${
            workbookDownloaded
              ? "bg-emerald-500/8 ring-emerald-500/20 hover:bg-emerald-500/12"
              : "bg-[var(--sun-gold)]/10 ring-[var(--sun-gold)]/30 hover:bg-[var(--sun-gold)]/15"
          }`}
        >
          <HugeiconsIcon
            icon={workbookDownloaded ? CheckmarkCircle02Icon : Download04Icon}
            className={`mt-0.5 size-5 shrink-0 ${workbookDownloaded ? "text-emerald-600" : "text-[var(--sun-gold)]"}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground normal-case font-sans">
              {workbookDownloaded
                ? "Course Blueprint Workbook downloaded"
                : "Download your Course Blueprint Workbook"}
            </p>
            <p className="text-xs text-muted-foreground normal-case font-sans mt-0.5">
              {workbookDownloaded
                ? "Keep it open alongside each module. Click to download again."
                : "We emailed it to you — click here to download a fresh copy and keep it open alongside each module."}
            </p>
          </div>
          <span className={`shrink-0 font-heading text-xs font-semibold tracking-widest uppercase ${workbookDownloaded ? "text-emerald-600" : "text-[var(--sun-gold)]"}`}>
            {workbookLoading ? "Loading…" : workbookDownloaded ? "Downloaded ✓" : "Download PDF →"}
          </span>
        </button>

        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-[var(--fire-red)]/8 px-5 py-4 ring-1 ring-[var(--fire-red)]/15">
          <HugeiconsIcon
            icon={Calendar03Icon}
            className="mt-0.5 size-5 shrink-0 text-[var(--fire-red)]"
          />
          <p className="text-sm leading-relaxed text-foreground/80 normal-case font-sans">
            {library.nextModule === null
              ? "You've unlocked every module. Rewatch any of them anytime."
              : library.canUnlockToday
                ? `Module ${library.nextModule} is ready to unlock today. Modules you've already unlocked stay available to rewatch anytime.`
                : "You've unlocked today's module. The next one opens tomorrow — give the work time to take root."}
          </p>
        </div>

        {unlockError ? (
          <p className="mb-4 text-sm text-destructive normal-case">{unlockError}</p>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courseLessons.map((lesson) => (
            <CourseLessonCard
              key={lesson.slug}
              lesson={lesson}
              state={lessonState(lesson.number, library)}
              isUnlocking={unlockingModule === lesson.number}
              onUnlock={() => handleUnlock(lesson)}
              onPlay={() => handlePlay(lesson)}
            />
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

      {playing ? (
        <CourseVideoModal
          lesson={playing}
          url={videoUrl}
          isLoading={videoLoading}
          error={videoError}
          onClose={closePlayer}
        />
      ) : null}
    </div>
  )
}
