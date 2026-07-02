import { useEffect, useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { z } from "zod"

import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { FireCtaSection } from "@/components/fire-cta-section"
import { ExternalCtaButton } from "@/components/external-cta-button"
import { OwnedNotice } from "@/components/owned-notice"
import { EbookThankYou } from "@/components/ebook-thank-you"
import { TestimonialVideoGrid } from "@/components/testimonial-marquee"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  blueprintModules,
  costOfStayingAway,
  ebookCoverUrl,
  ebookPurchaseUrl,
  pillars,
  pricing,
  testimonials,
} from "@/data/site"

export const Route = createFileRoute("/ebook")({
  // SamCart's "Return URL" / "Thank You Page" is set to /ebook?purchased=1 so
  // buyers land back here after checkout instead of on a SamCart page. The
  // router's search parser coerces numeric-looking query values, so "1"
  // arrives as either the string or the number depending on how SamCart
  // encodes it — accept both.
  validateSearch: z.object({
    purchased: z.union([z.literal("1"), z.literal(1)]).optional(),
  }),
  head: () => ({
    meta: [
      { title: "The E-book | Faith on Fire" },
      {
        name: "description",
        content:
          "The Faith on Fire Blueprint e-book — the three-pillar roadmap to return to God, restore relationships, and reignite your purpose. Start today.",
      },
    ],
  }),
  component: EbookPage,
})

function EbookPage() {
  // The ebook is included with the Course and Mastermind tiers, so an owning
  // member sees a "you already have it" notice instead of the buy CTA.
  const { access } = Route.useRouteContext()
  const { purchased } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    // ?purchased=1 alone isn't proof of a real purchase — anyone can type it
    // into the address bar. Only trust it when the browser actually arrived
    // via a SamCart referrer, which a manually-typed or shared URL won't have.
    const cameFromSamcart = document.referrer.includes("samcart.com")
    if ((purchased === "1" || purchased === 1) && cameFromSamcart) {
      setShowThankYou(true)
    }
  }, [purchased])

  function dismissThankYou() {
    setShowThankYou(false)
    void navigate({ search: {}, replace: true })
  }

  return (
    <>
      {showThankYou && <EbookThankYou onDismiss={dismissThankYou} />}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div
          className="absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            backgroundImage:
              "radial-gradient(closest-side, var(--flame-orange), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">
          <img
            src={ebookCoverUrl}
            alt="The Faith on Fire Blueprint e-book cover"
            className="w-56 shrink-0 rounded-lg shadow-2xl sm:w-64 lg:w-72"
          />
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
              The Faith on Fire E-book
            </span>
            <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
              Your roadmap back to God starts here.
            </h1>
            <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
              The Blueprint e-book names the patterns that pull men away from God — and walks you
              through the three pillars that bring you home: Return, Restore, Reignite.
            </p>
            <div className="mt-2 flex flex-col items-center gap-2 lg:items-start">
              {access.hasEbook ? (
                <OwnedNotice tone="light">You already have the E-book</OwnedNotice>
              ) : (
                <ExternalCtaButton href={ebookPurchaseUrl}>Get the E-book</ExternalCtaButton>
              )}
              <p className="font-heading text-sm text-white/60 normal-case">
                {pricing.ebook.guarantee}
              </p>
            </div>
          </div>
        </div>
      </section>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Why It Matters"
          title="The ache is a signal, not a sentence."
          description="The e-book starts by naming three patterns men recognize when they have drifted from God — and bringing them into the light."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {costOfStayingAway.map((item) => (
            <Card key={item.title} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-3 p-7">
                <span className="gradient-fire h-1 w-16 rounded-full" />
                <h3 className="text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="The Roadmap"
          title="Built on the Three Pillars"
          description="A simple, living pathway back to God — not a formula, but the framework the whole Blueprint is built on."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.key} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-3 p-7">
                <h3 className="text-xl">{pillar.title}</h3>
                <p className="font-heading text-xs font-semibold tracking-[0.16em] text-[var(--fire-red)]">
                  {pillar.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="What's Inside"
          title="10 chapters, module by module"
          description="Every chapter follows the same structure: Key Teaching, Reflection, Declaration, and an action step — so the e-book moves from reading into doing."
        />
        <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
          {blueprintModules.map((module) => (
            <div
              key={module.slug}
              className="flex items-start gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="mt-0.5 size-5 shrink-0 text-[var(--fire-red)]"
              />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  {module.number}. {module.title}
                </p>
                <p className="text-sm leading-snug text-muted-foreground normal-case font-sans">
                  {module.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-2">
          {access.hasEbook ? (
            <OwnedNotice>You already have the E-book</OwnedNotice>
          ) : (
            <ExternalCtaButton href={ebookPurchaseUrl}>Get the E-book</ExternalCtaButton>
          )}
          <p className="font-heading text-sm text-muted-foreground normal-case">
            {pricing.ebook.guarantee}
          </p>
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Video Testimonials"
          title="What People Are Saying"
          description="Real voices on what Marc's coaching, teaching, and guidance have meant in their lives."
        />
        <div className="mt-14">
          <TestimonialVideoGrid testimonials={testimonials} />
        </div>
      </GradientSection>

      <FireCtaSection
        eyebrow="Start Today"
        title="Your next chapter starts with one decision."
        description="Download the Blueprint e-book and take the first step back — then keep the fire burning inside the brotherhood."
        ctaLabel="Join the Brotherhood"
        ctaHref="/mastermind"
      />
    </>
  )
}
