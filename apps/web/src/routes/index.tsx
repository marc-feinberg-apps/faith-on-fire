import { createFileRoute } from "@tanstack/react-router"

import { IntroVideoSection } from "@/components/intro-video-section"
import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { FireCtaSection } from "@/components/fire-cta-section"
import { PillarCard } from "@/components/pillar-card"
import { FounderCard } from "@/components/founder-card"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
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

const values = [
  {
    title: "Honesty Over Performance",
    description: "We don't reward looking good. We reward telling the truth.",
  },
  {
    title: "Brotherhood Over Isolation",
    description: "A man alone is a man vulnerable. We pursue connection on purpose.",
  },
  {
    title: "Obedience Over Intention",
    description: "Every teaching ends in an action step. Conviction leads to action.",
  },
  {
    title: "Grace Over Shame",
    description: "Conviction produces hunger, not shame. We return within 24 hours.",
  },
]

function HomePage() {
  return (
    <>
      <IntroVideoSection />
      <ProblemSection />
      <PillarsSection />
      <MissionValuesSection />
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

function PillarsSection() {
  return (
    <GradientSection variant="white">
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

function MissionValuesSection() {
  return (
    <GradientSection variant="cream">
      <SectionHeading
        eyebrow="What We Stand On"
        title="Coming home, on purpose."
        description="Faith on Fire exists to help men come home to God, make peace with the man in the mirror, and rediscover their assignment inside a brotherhood that keeps the fire burning."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <Card key={value.title} className="border-none p-0 ring-1 ring-foreground/10">
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-lg">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                {value.description}
              </p>
            </CardContent>
          </Card>
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
