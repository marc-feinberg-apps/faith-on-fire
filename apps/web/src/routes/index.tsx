import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { FireIcon, MountainIcon, SunriseIcon } from "@hugeicons/core-free-icons"

import { CtaButton } from "@/components/cta-button"
import { IntroVideoSection } from "@/components/intro-video-section"
import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { FireCtaSection } from "@/components/fire-cta-section"
import { PillarCard } from "@/components/pillar-card"
import { ResourceCard } from "@/components/resource-card"
import { FounderCard } from "@/components/founder-card"
import type { SiteIconName } from "@/components/site-icon"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  costOfStayingAway,
  experienceItems,
  pillars,
  problemCards,
  problemStatSource,
  siteConfig,
} from "@/data/site"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Faith on Fire | A Brotherhood for Men Who Refuse to Drift" },
      { name: "description", content: siteConfig.tagline },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <IntroVideoSection />
      <HeroSection />
      <ProblemSection />
      <CostSection />
      <PillarsSection />
      <BrotherhoodSection />
      <ExperienceSection />
      <FounderSection />
      <FireCtaSection
        eyebrow="The Fire Is Burning"
        title="Let's add the next log."
        description="Every man who has ever stayed on fire had one thing in common: he stopped doing it alone. Your next chapter starts with one decision."
        ctaLabel="Join Faith on Fire"
      />
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-ember" />
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--ember-dark)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(closest-side, var(--flame-orange), var(--fire-red) 60%, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-90"
        style={{
          backgroundImage:
            "linear-gradient(to top, var(--ember-dark) 0%, transparent 100%)",
        }}
      />
      {/* mountain silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full text-black/30"
        viewBox="0 0 1440 220"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 220L180 80L340 160L520 40L700 150L880 60L1060 170L1240 90L1440 180V220H0Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-28 text-center sm:py-36">
        <div className="rounded-2xl border border-white/35 bg-white px-6 py-5 shadow-2xl shadow-black/35 ring-1 ring-[var(--sun-gold)]/25 sm:px-8 sm:py-6">
          <img
            src="/assets/brand/faith-on-fire-logo-transparent.png"
            alt="Faith on Fire"
            width={1376}
            height={708}
            className="h-auto w-[min(76vw,360px)] drop-shadow-[0_0_38px_rgba(255,140,40,0.28)]"
          />
        </div>

        <div className="flex items-center gap-2 text-[var(--sun-gold)]">
          <HugeiconsIcon icon={SunriseIcon} className="size-5" strokeWidth={2} />
          <span className="font-heading text-sm font-semibold tracking-[0.25em]">
            A Brotherhood for Men Who Refuse to Drift
          </span>
        </div>

        <h1 className="text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Return. Restore.
          <br />
          Reignite.
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-white/80 normal-case font-sans sm:text-xl">
          Faith on Fire helps men return to God, restore relationships, and reignite their purpose
          through brotherhood, spiritual discipline, and practical action.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <CtaButton href="/join">Join the Brotherhood</CtaButton>
          <CtaButton href="/blueprint" variant="ghost-light">
            Explore the Blueprint
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <GradientSection variant="cream">
      <SectionHeading
        eyebrow="The Wake-Up Call"
        title="Spiritual drift costs more than you think."
        description="It happens slowly — one compromise, one distraction, one silent morning at a time. A 2025 survey of 250 men in faith recovery found five recurring patterns."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {problemCards.map((card) => (
          <Card key={card.key} className="border-none p-0 ring-1 ring-foreground/10">
            <CardContent className="flex flex-col gap-2 p-6">
              <span className="text-gradient-fire font-heading text-3xl font-bold">
                {card.stat}
              </span>
              <h3 className="text-lg">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground normal-case font-sans">
        {problemStatSource}
      </p>
    </GradientSection>
  )
}

function CostSection() {
  return (
    <GradientSection variant="white">
      <SectionHeading
        eyebrow="The Cost of Staying Away"
        title="The ache is a signal, not a sentence."
        description="The ebook names three patterns men recognize when they have drifted from God. Faith on Fire starts by bringing those patterns into the light."
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
  )
}

function PillarsSection() {
  return (
    <GradientSection variant="cream">
      <SectionHeading
        eyebrow="The Roadmap"
        title="The Three Pillars"
        description="A simple, three-pillar roadmap back to God — not a formula, but a living pathway that has changed countless lives."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <PillarCard key={pillar.key} pillar={pillar} index={index} />
        ))}
      </div>
    </GradientSection>
  )
}

function BrotherhoodSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-ember" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-6">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            Brotherhood
          </span>
          <h2 className="text-4xl leading-[1.1] text-white sm:text-5xl">
            You were never meant to do this alone.
          </h2>
          <p className="text-lg leading-relaxed text-white/75 normal-case font-sans">
            Isolation is one of the enemy's oldest weapons — a lone sheep is easy prey. Every man
            who has fallen hard has one thing in common: he was doing life by himself. Brotherhood
            is not optional for a man on fire. It is essential.
          </p>
          <p className="font-heading text-xl text-[var(--sun-gold)]">
            “A man alone is a man vulnerable.”
          </p>
          <div>
            <CtaButton href="/community">Find Your People</CtaButton>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: FireIcon, label: "Weekly Mastermind" },
            { icon: MountainIcon, label: "Real Accountability" },
            { icon: SunriseIcon, label: "Daily Disciplines" },
            { icon: FireIcon, label: "Brothers For Life" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <HugeiconsIcon icon={item.icon} className="size-7 text-[var(--sun-gold)]" />
              <span className="font-heading text-sm font-semibold text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <GradientSection variant="cream">
      <SectionHeading
        eyebrow="Inside the Brotherhood"
        title="What You'll Experience"
        description="This is not passive content. It's an interactive transformation guide lived out with other men."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experienceItems.map((item) => (
          <ResourceCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon as SiteIconName}
          />
        ))}
      </div>
    </GradientSection>
  )
}

function FounderSection() {
  return (
    <GradientSection variant="white">
      <SectionHeading
        eyebrow="Your Guide"
        title="A guide for men ready to stop drifting and start walking with God again."
      />
      <div className="mt-14">
        <FounderCard />
      </div>
    </GradientSection>
  )
}
