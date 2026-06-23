import { createFileRoute, redirect, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  UserGroup03Icon,
  PlayIcon,
  Calendar03Icon,
  Download04Icon,
  Fire03Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons"

import { SectionHeading } from "@/components/section-heading"
import { ZoomCard } from "@/components/member/zoom-card"
import { ConsultationCard } from "@/components/member/consultation-card"
import { Card, CardContent } from "@workspace/ui/components/card"
import { getMastermindArea } from "@/server/member"
import { mastermindPerks, mastermindSchedule } from "@/data/site"

// Map the data-layer icon names (strings) to icon objects for rendering.
const perkIcons = {
  UserGroup03Icon,
  PlayIcon,
  Calendar03Icon,
  Download04Icon,
  Fire03Icon,
  Award01Icon,
} as const

export const Route = createFileRoute("/_authenticated/brotherhood")({
  // Strict per-product gate: the mastermind hub requires an active subscription.
  beforeLoad: ({ context }) => {
    if (!context.access.hasMastermind) {
      throw redirect({ to: "/mastermind" })
    }
  },
  loader: () => getMastermindArea(),
  head: () => ({
    meta: [{ title: "The Brotherhood | Faith on Fire" }],
  }),
  component: BrotherhoodPage,
})

function BrotherhoodPage() {
  const area = Route.useLoaderData()
  const calendlyUrl = area?.calendlyUrl ?? ""
  const zoomUrl = area?.zoomUrl ?? ""

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
              The Brotherhood · Weekly Mastermind
            </span>
            <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">
              You're in the room.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground normal-case font-sans">
              This is your home base — your Zoom room, the weekly rhythm, and everything your
              membership unlocks. Show up weekly. Stay accountable.
            </p>
          </div>

          <div className="mt-8">
            <ZoomCard zoomUrl={zoomUrl} />
          </div>
        </div>
      </section>

      {/* Weekly schedule / agenda */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <SectionHeading
          eyebrow="Every Saturday"
          title="How the 90 minutes flow"
          align="left"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mastermindSchedule.agenda.map((item) => (
            <Card key={item.label} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-2 p-6">
                <span className="font-heading text-sm font-bold tracking-wide text-[var(--fire-red)]">
                  {item.time} EST
                </span>
                <h3 className="text-lg leading-tight">{item.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Value reinforcement: what the membership includes */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading
          eyebrow="Your Membership Includes"
          title="Everything you get for showing up"
          description="More than a weekly call — this is a full system to keep you on fire, month after month."
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mastermindPerks.map((perk) => {
            const icon = perkIcons[perk.icon]
            return (
              <Card key={perk.title} className="border-none p-0 ring-1 ring-foreground/10">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span className="gradient-fire flex size-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-[var(--fire-red)]/25">
                    <HugeiconsIcon icon={icon} className="size-5" />
                  </span>
                  <h3 className="text-lg leading-tight">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                    {perk.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Consultation */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <div className="mt-2">
          <ConsultationCard calendlyUrl={calendlyUrl} />
        </div>
      </section>
    </div>
  )
}
