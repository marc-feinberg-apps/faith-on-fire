import { useEffect } from "react"
import { Link } from "@tanstack/react-router"
import confetti from "canvas-confetti"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, MailAtSign01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"

const brandColors = ["#d81e05", "#f97e16", "#fac715"]

function fireConfetti() {
  const duration = 2200
  const end = Date.now() + duration

  ;(function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors: brandColors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors: brandColors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()

  confetti({
    particleCount: 80,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.5 },
    colors: brandColors,
  })
}

// Shown on the /ebook page when SamCart's post-purchase redirect lands the
// buyer back on the site (see README for the SamCart Return URL setup).
export function EbookThankYou({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    fireConfetti()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onDismiss()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onDismiss])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Purchase confirmed"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 animate-[fade-in-up_320ms_ease-out]"
      onClick={onDismiss}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl shadow-black/30"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-4" strokeWidth={2} />
        </button>

        <span className="gradient-fire mx-auto flex size-14 items-center justify-center rounded-full text-white">
          <HugeiconsIcon icon={MailAtSign01Icon} className="size-7" strokeWidth={2} />
        </span>
        <h2 className="mt-4 text-3xl leading-[1.1] text-foreground">You're in! 🎉</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          Thanks for grabbing the Faith on Fire Blueprint e-book. SamCart is sending your download
          and receipt straight to your inbox — check your email in the next few minutes.
        </p>

        <Button
          asChild
          className="gradient-fire mt-6 h-11 w-full rounded-full text-sm font-semibold uppercase"
          onClick={onDismiss}
        >
          <Link to="/course">See what's next: the Course</Link>
        </Button>
      </div>
    </div>
  )
}
