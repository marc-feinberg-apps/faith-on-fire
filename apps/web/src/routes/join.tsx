import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, Link01Icon } from "@hugeicons/core-free-icons"

import { JoinForm } from "@/components/join-form"
import { siteConfig } from "@/data/site"

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join | Faith on Fire" },
      {
        name: "description",
        content:
          "Start your Faith on Fire journey today. Tell us what you're believing God for and which area you need most — Return, Restore, Reignite, Remain, or Brotherhood.",
      },
    ],
  }),
  component: JoinPage,
})

function JoinPage() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div className="flex flex-col gap-6">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            Join Faith on Fire
          </span>
          <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl">
            Come into the Brotherhood and remain on fire together.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground normal-case font-sans sm:text-lg">
            This is for every man ready to return, rebuild, and run his race through the Faith on
            Fire Blueprint and the Weekly Mastermind / Brotherhood. The work continues here.
          </p>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
            <a
              href={siteConfig.url}
              className="flex items-center gap-3 text-sm font-medium text-foreground/85 transition-colors hover:text-[var(--fire-red)]"
            >
              <HugeiconsIcon icon={Link01Icon} className="size-4 text-[var(--fire-red)]" />
              www.faithonfire.world
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-sm font-medium text-foreground/85 transition-colors hover:text-[var(--fire-red)]"
            >
              <HugeiconsIcon icon={Mail01Icon} className="size-4 text-[var(--fire-red)]" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          <JoinForm />
        </div>
      </div>
    </section>
  )
}
