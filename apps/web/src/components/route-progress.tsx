import { useEffect, useRef, useState } from "react"
import { useRouterState } from "@tanstack/react-router"

// A thin gradient bar pinned to the very top that fills while a navigation is in
// flight and fades out once the destination is ready. Gives clicks an immediate
// "something is happening" response even when a loader takes a moment.
export function RouteProgress() {
  const isLoading = useRouterState({
    select: (state) => state.isLoading || state.isTransitioning,
  })
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])
  // Tracks whether the bar is currently shown without making it an effect dep,
  // so toggling visibility doesn't restart the creep animation mid-load.
  const shownRef = useRef(false)

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (isLoading) {
      shownRef.current = true
      setVisible(true)
      setProgress(8)
      // Creep forward without ever reaching 100% until the load resolves.
      timers.current.push(setTimeout(() => setProgress(45), 120))
      timers.current.push(setTimeout(() => setProgress(72), 360))
      timers.current.push(setTimeout(() => setProgress(88), 900))
    } else if (shownRef.current) {
      setProgress(100)
      timers.current.push(
        setTimeout(() => {
          shownRef.current = false
          setVisible(false)
        }, 240),
      )
      timers.current.push(setTimeout(() => setProgress(0), 480))
    }

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5"
      role="progressbar"
      aria-hidden="true"
    >
      <div
        className="gradient-fire h-full origin-left shadow-[0_0_8px_var(--fire-red)] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      />
    </div>
  )
}
