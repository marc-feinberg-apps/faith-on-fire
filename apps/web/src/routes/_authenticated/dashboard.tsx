import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Compass01Icon,
  UserGroup03Icon,
  ArrowRight01Icon,
  LockedIcon,
  UserIcon,
  Book02Icon,
  Download04Icon,
} from "@hugeicons/core-free-icons"

import { Card, CardContent } from "@workspace/ui/components/card"
import { getEbookDownloadUrl } from "@/server/member"

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Member Dashboard | Faith on Fire" }],
  }),
  component: DashboardPage,
})

interface AreaCard {
  to: string
  icon: typeof Compass01Icon
  eyebrow: string
  title: string
  description: string
  owned: boolean
  upsellTo: string
}

function DashboardPage() {
  const { auth, access } = Route.useRouteContext()

  const areas: Array<AreaCard> = [
    {
      to: "/courses",
      icon: Compass01Icon,
      eyebrow: "The Course",
      title: "Your Course Library",
      description: "All 10 modules of the Faith on Fire Blueprint — watch at your own pace.",
      owned: access.hasCourse,
      upsellTo: "/course",
    },
    {
      to: "/brotherhood",
      icon: UserGroup03Icon,
      eyebrow: "The Brotherhood",
      title: "Weekly Mastermind",
      description: "Your Zoom room, the weekly schedule, and everything your membership unlocks.",
      owned: access.hasMastermind,
      upsellTo: "/mastermind",
    },
  ]

  const ownsNothing = !access.hasCourse && !access.hasMastermind

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            Welcome Back
          </span>
          <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">Your Faith on Fire</h1>
          <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            Signed in as {auth.user?.email}
          </p>
        </div>

        {ownsNothing ? (
          <Card className="mt-10 border-none p-0 ring-1 ring-foreground/10">
            <CardContent className="flex flex-col items-start gap-4 p-8">
              <h2 className="text-2xl">You don't have any active access yet.</h2>
              <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                Grab the Course or join the Weekly Mastermind to unlock your member area.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/course"
                  className="gradient-fire inline-flex items-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-semibold tracking-wide text-white shadow-lg shadow-[var(--fire-red)]/25 transition-transform hover:scale-[1.03] normal-case"
                >
                  Explore the Course
                </Link>
                <Link
                  to="/mastermind"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 px-6 py-3 font-heading text-sm font-semibold tracking-wide text-foreground transition-colors hover:border-[var(--fire-red)] hover:text-[var(--fire-red)] normal-case"
                >
                  Join the Mastermind
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {areas.map((area) => (
                <AreaTile key={area.to} area={area} />
              ))}
            </div>

            {access.hasEbook ? <EbookCard /> : null}
          </>
        )}

        <Link
          to="/account"
          className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold tracking-wide text-foreground/70 transition-colors hover:text-[var(--fire-red)] normal-case"
        >
          <HugeiconsIcon icon={UserIcon} className="size-4" />
          Account & settings
        </Link>
      </div>
    </section>
  )
}

function EbookCard() {
  const getEbookUrl = useServerFn(getEbookDownloadUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleDownload() {
    setError("")
    setIsLoading(true)
    try {
      const result = await getEbookUrl()
      if (result?.url) {
        window.open(result.url, "_blank", "noopener,noreferrer")
      } else {
        setError("We couldn't generate your download link. Please try again.")
      }
    } catch {
      setError("We couldn't generate your download link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-6 overflow-hidden border-none p-0 ring-1 ring-foreground/10">
      <CardContent className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--fire-red)]/10 text-[var(--fire-red)]">
            <HugeiconsIcon icon={Book02Icon} className="size-6" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--fire-red)]">
              Included With Your Access
            </span>
            <h3 className="text-xl leading-tight">The Faith on Fire Blueprint E-book</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
              The full Return, Restore, Reignite roadmap — yours to download and keep.
            </p>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isLoading}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-foreground/15 px-7 py-3.5 font-heading text-sm font-semibold tracking-wide text-foreground transition-colors hover:border-[var(--fire-red)] hover:text-[var(--fire-red)] disabled:pointer-events-none disabled:opacity-60 normal-case"
        >
          <HugeiconsIcon icon={Download04Icon} className="size-4" />
          {isLoading ? "Preparing..." : "Download the E-book"}
        </button>
      </CardContent>
    </Card>
  )
}

function AreaTile({ area }: { area: AreaCard }) {
  if (!area.owned) {
    return (
      <Link to={area.upsellTo} className="group block h-full">
        <Card className="h-full border-none border-dashed p-0 ring-1 ring-dashed ring-foreground/15 transition-colors hover:ring-[var(--fire-red)]/30">
          <CardContent className="flex h-full flex-col gap-3 p-7">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <HugeiconsIcon icon={LockedIcon} className="size-5" />
            </span>
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-muted-foreground">
              {area.eyebrow}
            </span>
            <h3 className="text-xl text-foreground/80">{area.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
              You don't have access to this yet.
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 font-heading text-sm font-semibold tracking-wide text-[var(--fire-red)] normal-case">
              Unlock it
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </span>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={area.to} className="group block h-full">
      <Card className="h-full overflow-hidden border-none p-0 ring-1 ring-foreground/10 transition-shadow hover:shadow-xl hover:shadow-foreground/5">
        <CardContent className="flex h-full flex-col gap-3 p-7">
          <span className="gradient-fire flex size-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-[var(--fire-red)]/25">
            <HugeiconsIcon icon={area.icon} className="size-5" />
          </span>
          <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            {area.eyebrow}
          </span>
          <h3 className="text-xl">{area.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            {area.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 font-heading text-sm font-semibold tracking-wide text-[var(--fire-red)] normal-case">
            Enter
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
