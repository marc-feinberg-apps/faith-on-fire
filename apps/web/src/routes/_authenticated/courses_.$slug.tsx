import { useCallback, useEffect, useRef, useState } from "react"
import { createFileRoute, redirect, Link, useNavigate } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import "sonner/dist/styles.css"

import { Toaster } from "@workspace/ui/components/sonner"
import { VideoPlayer } from "@/components/member/video-player"
import { CourseWatchRail } from "@/components/member/course-watch-rail"
import { LessonDetailPanel } from "@/components/member/lesson-detail-panel"
import { UpNextOverlay } from "@/components/member/up-next-overlay"
import { WorkbookDownloadToast } from "@/components/member/workbook-download-toast"
import { getCourseLibrary, getCourseVideoUrl, getWorkbookDownloadUrl } from "@/server/member"
import { courseLessons, blueprintModules } from "@/data/site"
import { WORKBOOK_DOWNLOADED_KEY, WORKBOOK_TOAST_DISMISSED_KEY } from "@/lib/workbook"

// How long the "up next" overlay counts down before auto-advancing.
const AUTOPLAY_COUNTDOWN_SECONDS = 6
// How long into module 1 before nudging toward the workbook download.
const WORKBOOK_TOAST_DELAY_MS = 6000
const WORKBOOK_TOAST_ID = "workbook-download-nudge"

export const Route = createFileRoute("/_authenticated/courses_/$slug")({
  // Same product gate as the library grid, plus the slug itself must resolve
  // to a real module — an unknown slug sends the member back to the grid
  // rather than rendering a broken page.
  beforeLoad: ({ context, params }) => {
    if (!context.access.hasCourse) {
      throw redirect({ to: "/course" })
    }
    const lessonExists = courseLessons.some((lesson) => lesson.slug === params.slug)
    if (!lessonExists) {
      throw redirect({ to: "/courses" })
    }
  },
  loader: async ({ params }) => {
    const lesson = courseLessons.find((entry) => entry.slug === params.slug)!
    const fullModule = blueprintModules.find((entry) => entry.slug === params.slug)!

    const library = await getCourseLibrary()
    // The URL is never trusted: a locked module (or a stale link to one the
    // member hasn't reached yet) redirects back to the grid, same as the
    // server-side re-check in getCourseVideoUrl itself.
    if (!library || !library.unlocked.includes(lesson.number)) {
      throw redirect({ to: "/courses" })
    }

    const { url } = await getCourseVideoUrl({ data: { module: lesson.number } })
    return { lesson, fullModule, library, videoUrl: url }
  },
  head: ({ params }) => {
    const lesson = courseLessons.find((entry) => entry.slug === params.slug)
    return {
      meta: [{ title: lesson ? `${lesson.title.split(" | ").pop()} | Faith on Fire` : "Your Course | Faith on Fire" }],
    }
  },
  component: CourseWatchPage,
})

function CourseWatchPage() {
  const { lesson, fullModule, library, videoUrl } = Route.useLoaderData()
  const navigate = useNavigate()
  const fetchWorkbookUrl = useServerFn(getWorkbookDownloadUrl)

  const lessonIndex = courseLessons.findIndex((entry) => entry.slug === lesson.slug)
  // `.at()` (unlike index access) is typed `T | undefined`, which is correct
  // here — the last lesson genuinely has no successor.
  const nextLesson = courseLessons.at(lessonIndex + 1)
  const nextIsUnlocked = !!nextLesson && library.unlocked.includes(nextLesson.number)

  const [showUpNext, setShowUpNext] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(AUTOPLAY_COUNTDOWN_SECONDS)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // A fresh lesson (rail click, or the autoplay navigation itself) always
  // starts with the overlay dismissed and the countdown reset.
  useEffect(() => {
    clearCountdown()
    setShowUpNext(false)
    setSecondsRemaining(AUTOPLAY_COUNTDOWN_SECONDS)
  }, [lesson.slug, clearCountdown])

  const goToNext = useCallback(() => {
    if (!nextLesson) return
    clearCountdown()
    void navigate({ to: "/courses/$slug", params: { slug: nextLesson.slug } })
  }, [clearCountdown, navigate, nextLesson])

  function handleEnded() {
    // Never autoplay into a locked lesson — nothing happens if there isn't a
    // reachable next one.
    if (!nextIsUnlocked) return
    setSecondsRemaining(AUTOPLAY_COUNTDOWN_SECONDS)
    setShowUpNext(true)
  }

  useEffect(() => {
    if (!showUpNext) return
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          goToNext()
          return 0
        }
        return current - 1
      })
    }, 1000)
    return clearCountdown
  }, [showUpNext, goToNext, clearCountdown])

  function cancelUpNext() {
    clearCountdown()
    setShowUpNext(false)
  }

  // A one-time nudge toward the workbook while watching the orientation
  // lesson. Skipped entirely once the member has downloaded it (tracked the
  // same way as the grid page's banner) or already dismissed this toast.
  const [workbookDownloaded, setWorkbookDownloaded] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem(WORKBOOK_DOWNLOADED_KEY),
  )

  const downloadWorkbook = useCallback(async () => {
    const result = await fetchWorkbookUrl()
    if (!result?.url) return false
    window.open(result.url, "_blank", "noopener")
    localStorage.setItem(WORKBOOK_DOWNLOADED_KEY, "1")
    setWorkbookDownloaded(true)
    toast.dismiss(WORKBOOK_TOAST_ID)
    return true
  }, [fetchWorkbookUrl])

  const dismissWorkbookToast = useCallback(() => {
    localStorage.setItem(WORKBOOK_TOAST_DISMISSED_KEY, "1")
    toast.dismiss(WORKBOOK_TOAST_ID)
  }, [])

  useEffect(() => {
    if (lesson.number !== 1 || workbookDownloaded) return
    if (localStorage.getItem(WORKBOOK_TOAST_DISMISSED_KEY)) return

    const timer = setTimeout(() => {
      toast.custom(() => <WorkbookDownloadToast onDownload={downloadWorkbook} onDismiss={dismissWorkbookToast} />, {
        id: WORKBOOK_TOAST_ID,
        duration: Infinity,
      })
    }, WORKBOOK_TOAST_DELAY_MS)

    return () => {
      clearTimeout(timer)
      toast.dismiss(WORKBOOK_TOAST_ID)
    }
  }, [lesson.slug, lesson.number, workbookDownloaded, downloadWorkbook, dismissWorkbookToast])

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold tracking-wide text-foreground/60 transition-colors hover:text-[var(--fire-red)] normal-case"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          Course Library
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:grid lg:grid-cols-3 lg:items-start lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
            {videoUrl ? (
              // Keyed by slug so switching lessons (same route, same component
              // instance) mounts a fresh player instead of carrying over the
              // previous video's scrubber/volume/playing state. Both overlays
              // go through VideoPlayer's `overlay` slot so they stay visible
              // in native fullscreen, not just in the normal page layout.
              <VideoPlayer
                key={lesson.slug}
                src={videoUrl}
                onEnded={handleEnded}
                overlay={
                  <>
                    {showUpNext && nextLesson ? (
                      <UpNextOverlay
                        nextLesson={nextLesson}
                        secondsRemaining={secondsRemaining}
                        onCancel={cancelUpNext}
                        onPlayNow={goToNext}
                      />
                    ) : null}
                    {/*
                      Mounted here (a descendant of VideoPlayer's fullscreen
                      container) rather than globally in the root layout, so
                      the workbook nudge toast stays visible even in native
                      fullscreen — anything outside this subtree is hidden by
                      the Fullscreen API while active.
                    */}
                    <Toaster position="bottom-right" />
                  </>
                }
              />
            ) : (
              <div className="flex size-full items-center justify-center px-6 text-center text-white/70">
                <span className="font-heading text-sm normal-case">
                  We couldn't load this video. Please try again.
                </span>
              </div>
            )}
          </div>

          <LessonDetailPanel module={fullModule} />
        </div>

        <div className="mt-8 lg:col-span-1 lg:mt-0">
          <CourseWatchRail lessons={courseLessons} currentSlug={lesson.slug} unlocked={library.unlocked} />
        </div>
      </section>
    </div>
  )
}
