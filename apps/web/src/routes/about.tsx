import { createFileRoute } from "@tanstack/react-router"
import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { PillarCard } from "@/components/pillar-card"
import { FounderCard } from "@/components/founder-card"
import { FireCtaSection } from "@/components/fire-cta-section"
import { Card, CardContent } from "@workspace/ui/components/card"
import { fourPillars } from "@/data/site"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Faith on Fire" },
      {
        name: "description",
        content:
          "Faith on Fire exists to help men come home to God, make peace with the man in the mirror, rediscover their assignment, and remain connected to a brotherhood that keeps the fire burning.",
      },
    ],
  }),
  component: AboutPage,
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
    description: "Conviction produces hunger, not shame. We return within 24 hours — no shame spiral.",
  },
]

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            About Faith on Fire
          </span>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Coming Home, On Purpose.
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            Faith on Fire exists to help men come home to God, make peace with the man in the
            mirror, rediscover their assignment, and remain connected to a brotherhood that keeps
            the fire burning.
          </p>
        </div>
      </section>

      <GradientSection variant="cream">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
              Mission
            </span>
            <h2 className="text-2xl text-foreground">
              Lead men back to God with a simple, four-step roadmap.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground normal-case font-sans">
              Return, restore, reignite, remain — not formulas, but living pathways that have
              changed countless lives, including the founder's own. The moment a man turns, no
              matter how far he's wandered, the Father doesn't just wait. He runs.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
              Vision
            </span>
            <h2 className="text-2xl text-foreground">
              A brotherhood of men who refuse to drift, anywhere on earth.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground normal-case font-sans">
              We envision a movement of men who stay engaged with church, small groups, and
              accountability partners — a fire that burns brighter every day instead of fading
              into another season of distance.
            </p>
          </div>
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading eyebrow="What We Stand On" title="Our Values" />
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

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="The Roadmap"
          title="The Four Pillars"
          description="Every resource, every module, every conversation inside Faith on Fire runs through these four pillars."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fourPillars.map((pillar, index) => (
            <PillarCard key={pillar.key} pillar={pillar} index={index} />
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Your Guide"
          title="A guide for men ready to stop drifting and start walking with God again."
        />
        <div className="mt-14">
          <FounderCard />
        </div>
      </GradientSection>

      <FireCtaSection
        title="The fire is burning. Let's add the next log."
        ctaLabel="Join Faith on Fire"
      />
    </>
  )
}
