import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Alert02Icon } from "@hugeicons/core-free-icons"
import { z } from "zod"

import { getCheckoutSession } from "@/server/checkout"
import { VideoPlayer } from "@/components/member/video-player"
import { BuyButton } from "@/components/buy-button"
import { weeklyMastermindOfferVideoUrl } from "@/data/site"

export const Route = createFileRoute("/purchase/course-upsell")({
  // Stripe's success_url for the "course" product points here (see
  // src/server/checkout.ts) instead of /purchase/success, so Course buyers
  // see a one-time Mastermind pitch before heading to login.
  validateSearch: z.object({
    session_id: z.string().optional(),
  }),
  loaderDeps: ({ search }) => ({ sessionId: search.session_id }),
  loader: async ({ deps }) => {
    if (!deps.sessionId) return { ok: false, email: null }
    return getCheckoutSession({ data: { sessionId: deps.sessionId } })
  },
  head: () => ({
    meta: [{ title: "You're In! | Faith on Fire" }],
  }),
  component: CourseUpsellPage,
})

function CourseUpsellPage() {
  const { ok, email } = Route.useLoaderData()

  if (!ok) {
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
                This page is only valid right after a completed purchase. If you just paid and
                landed here by mistake, check your email for confirmation, or reach out to{" "}
                support@faithonfire.world.
              </p>
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
          <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">You're in!</h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            Thanks for joining the Faith on Fire Course. Check {email ?? "your email"} for your
            login details — they'll arrive within a few minutes.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <h2 className="text-2xl leading-[1.1] text-foreground sm:text-3xl">
            Before you go — the brotherhood meets weekly.
          </h2>
          <p className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            Watch this quick word about the Mastermind — live weekly calls to keep you accountable
            long after the Course ends.
          </p>
        </div>

        <div className="group relative mt-8 w-full">
          <div className="gradient-fire absolute -inset-px rounded-[1.4rem] opacity-70 blur-[2px]" />
          <div className="relative aspect-video w-full overflow-hidden rounded-[1.3rem] shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <VideoPlayer src={weeklyMastermindOfferVideoUrl} autoPlay defaultMuted />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <BuyButton product="mastermind">Join the Mastermind</BuyButton>
          <Link
            to="/login"
            className="font-heading text-sm font-semibold text-muted-foreground normal-case underline-offset-4 hover:text-foreground hover:underline"
          >
            Skip for now, go to Login
          </Link>
        </div>
      </div>
    </section>
  )
}
