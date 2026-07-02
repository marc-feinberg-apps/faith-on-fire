import { useEffect, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Alert02Icon } from "@hugeicons/core-free-icons"
import { z } from "zod"
import confetti from "canvas-confetti"

import { VideoPlayer } from "@/components/member/video-player"
import { BuyButton } from "@/components/buy-button"
import { courseBlueprintOfferVideoUrl } from "@/data/site"

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

export const Route = createFileRoute("/purchase/ebook-thank-you")({
  // SamCart's "Return URL" / "Thank You Page" is set to
  // /purchase/ebook-thank-you?purchased=1 so buyers land back here after
  // checkout (see README for the SamCart Return URL setup). The router's
  // search parser coerces numeric-looking query values, so "1" arrives as
  // either the string or the number depending on how SamCart encodes it.
  validateSearch: z.object({
    purchased: z.union([z.literal("1"), z.literal(1)]).optional(),
  }),
  head: () => ({
    meta: [{ title: "You're In! | Faith on Fire" }],
  }),
  component: EbookThankYouPage,
})

function EbookThankYouPage() {
  const { purchased } = Route.useSearch()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    // ?purchased=1 alone isn't proof of a real purchase — anyone can type it
    // into the address bar. Only trust it when the browser actually arrived
    // via a SamCart referrer, which a manually-typed or shared URL won't have.
    const cameFromSamcart = document.referrer.includes("samcart.com")
    if ((purchased === "1" || purchased === 1) && cameFromSamcart) {
      setVerified(true)
      fireConfetti()
    }
  }, [purchased])

  if (!verified) {
    return (
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-warm" />
        <div className="relative z-10 mx-auto max-w-md px-6">
          <div className="rounded-3xl bg-white p-7 text-center shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
            <div className="flex flex-col items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <HugeiconsIcon icon={Alert02Icon} className="size-7" />
              </span>
              <h1 className="text-3xl leading-[1.1] text-foreground">We couldn't verify that</h1>
              <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                This page is only valid right after a completed e-book purchase. If you just paid
                and landed here by mistake, check your email for confirmation, or reach out to{" "}
                support@faithonfire.world.
              </p>
              <Link
                to="/ebook"
                className="gradient-fire mt-2 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Back to the E-book
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="gradient-fire flex size-14 items-center justify-center rounded-full text-white">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-7" />
          </span>
          <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">You're in! 🎉</h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            Thanks for grabbing the Faith on Fire Blueprint e-book. SamCart is sending your
            download and receipt straight to your inbox — check your email in the next few
            minutes.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <h2 className="text-2xl leading-[1.1] text-foreground sm:text-3xl">
            Ready to go deeper?
          </h2>
          <p className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            Watch this quick word about the Course — the guided, module-by-module version of the
            Blueprint.
          </p>
        </div>

        <div className="group relative mt-8 w-full">
          <div className="gradient-fire absolute -inset-px rounded-[1.4rem] opacity-70 blur-[2px]" />
          <div className="relative aspect-video w-full overflow-hidden rounded-[1.3rem] shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <VideoPlayer src={courseBlueprintOfferVideoUrl} autoPlay defaultMuted />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <BuyButton product="course">Get the Course</BuyButton>
          <Link
            to="/course"
            className="font-heading text-sm font-semibold text-muted-foreground normal-case underline-offset-4 hover:text-foreground hover:underline"
          >
            See what's inside first
          </Link>
        </div>
      </div>
    </section>
  )
}
