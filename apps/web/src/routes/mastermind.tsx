import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Cancel01Icon, FireIcon } from "@hugeicons/core-free-icons"

import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { BuyButton } from "@/components/buy-button"
import { FaqSection } from "@/components/faq-section"
import { TestimonialVideoGrid } from "@/components/testimonial-marquee"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  allTestimonials,
  brotherhoodLies,
  communityForWho,
  communityNotForWho,
  mastermindFaqs,
  mastermindZoomUrl,
  memberJourney,
  pricing,
} from "@/data/site"

export const Route = createFileRoute("/mastermind")({
  head: () => ({
    meta: [
      { title: "The Mastermind | Faith on Fire" },
      {
        name: "description",
        content:
          "The Faith on Fire Weekly Mastermind — real accountability, honest brotherhood, and brothers for life. Show up weekly and stay on fire together.",
      },
    ],
  }),
  component: MastermindPage,
})

function MastermindPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${mastermindZoomUrl})`, backgroundPosition: "80% 80%" }}
        />
        <div className="absolute inset-0 gradient-ember opacity-80" />
        <div
          className="absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            backgroundImage: "radial-gradient(closest-side, var(--flame-orange), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            backgroundImage: "linear-gradient(to top, var(--ember-dark), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            The Brotherhood — Weekly Mastermind
          </span>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            You were never meant to do this alone.
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            The Brotherhood is Faith on Fire's standing weekly mastermind for men who refuse to
            drift — real accountability, honest conversation, and brothers for life. Show up
            weekly. Stay accountable.
          </p>
          <div className="mt-2">
            <BuyButton product="mastermind" tone="light">Join the Mastermind</BuyButton>
          </div>
          <p className="font-heading text-sm text-white/60 normal-case">
            {pricing.mastermind.guarantee}
          </p>
        </div>
      </section>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Inside the Mastermind"
          title="What Happens Inside the Community"
          description="A weekly mastermind built on Hebrews 10:24-25 — spurring one another on toward love and good deeds, not giving up meeting together."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Weekly Gathering",
              description: "A standing weekly mastermind where brothers show up and tell the truth.",
            },
            {
              title: "Honest Accountability",
              description: "Men with permission to ask the hard questions — and answer them honestly.",
            },
            {
              title: "Guided Teaching",
              description: "Key teaching, reflection, declaration, and action — every single week.",
            },
            {
              title: "Brothers For Life",
              description: "Relationships that outlast the program, built for the long haul.",
            },
          ].map((item) => (
            <Card key={item.title} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex flex-col gap-2 p-6">
                <h3 className="text-lg">{item.title}</h3>
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
          eyebrow="4 Lies Men Believe"
          title="What keeps men isolated"
          description="The four lies that keep men disconnected from God, church, and the brothers who could help them stay connected."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brotherhoodLies.map((lie, index) => (
            <Card key={lie.title} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <span className="gradient-fire flex size-9 items-center justify-center rounded-full font-heading text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-lg">{lie.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {lie.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Is This For You?"
          title="Who This Is For — And Who It Isn't"
          description="The Mastermind is for men ready to return, rebuild, and run their race."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card className="border-none p-0 ring-1 ring-[var(--fire-red)]/20">
            <CardContent className="flex flex-col gap-4 p-7">
              <h3 className="text-xl text-[var(--fire-red)]">Who This Is For</h3>
              <ul className="flex flex-col gap-3">
                {communityForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm normal-case font-sans">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      className="mt-0.5 size-5 shrink-0 text-[var(--fire-red)]"
                    />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-none p-0 ring-1 ring-foreground/10">
            <CardContent className="flex flex-col gap-4 p-7">
              <h3 className="text-xl text-muted-foreground">Who This Is Not For</h3>
              <ul className="flex flex-col gap-3">
                {communityNotForWho.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm normal-case font-sans">
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                    />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="The Path"
          title="The Member Journey"
          description="Six stages, walked together, with a brother beside you at every step."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memberJourney.map((step) => (
            <Card key={step.step} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex flex-col gap-2 p-6">
                <span className="gradient-fire flex size-9 items-center justify-center rounded-full font-heading text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="text-lg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Join The Mastermind"
            title="Show up weekly. Stay accountable."
            description="A recurring membership — cancel any time."
          />
          <BuyButton product="mastermind">Join the Mastermind</BuyButton>
          <p className="font-heading text-sm text-muted-foreground normal-case">
            {pricing.mastermind.guarantee}
          </p>
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Real Voices"
          title="What People Are Saying"
          description="Real voices on what Marc's coaching, teaching, and guidance have meant in their lives."
        />
        <div className="mt-14">
          <TestimonialVideoGrid testimonials={allTestimonials} columns={3} />
        </div>
      </GradientSection>

      <FaqSection items={mastermindFaqs} variant="cream" />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 gradient-ember" />
        <div
          className="absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            backgroundImage: "radial-gradient(closest-side, var(--flame-orange), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <div className="flex items-center gap-2 text-[var(--sun-gold)]">
            <HugeiconsIcon icon={FireIcon} className="size-5" strokeWidth={2} />
            <span className="font-heading text-sm font-semibold tracking-[0.2em]">
              The Fire Is Burning
            </span>
          </div>
          <h2 className="text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Accountability, not performance. Honesty, not hiding.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/75 normal-case font-sans">
            If you're ready for discipline instead of drift, your brothers are waiting.
          </p>
          <div className="mt-2">
            <BuyButton product="mastermind" tone="light">Find Your People</BuyButton>
          </div>
        </div>
      </section>
    </>
  )
}
