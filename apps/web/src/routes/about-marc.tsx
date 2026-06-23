import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link01Icon } from "@hugeicons/core-free-icons"

import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { FireCtaSection } from "@/components/fire-cta-section"
import { FounderCard } from "@/components/founder-card"
import { Card, CardContent } from "@workspace/ui/components/card"
import { founder, testimonials } from "@/data/site"

export const Route = createFileRoute("/about-marc")({
  head: () => ({
    meta: [
      { title: "About Marc Feinberg | Faith on Fire" },
      {
        name: "description",
        content:
          "Marc Feinberg — high-performance coach, certified biblical counselor, author, and speaker. 30+ years as an entrepreneur helping athletes, founders, and leaders break through.",
      },
    ],
  }),
  component: AboutMarcPage,
})

const marcStats = [
  { value: "30+", label: "Years as a lifestyle entrepreneur" },
  { value: "20+", label: "Years as a certified biblical counselor" },
  { value: "100s", label: "Athletes, founders & leaders coached" },
]

const marcServices = [
  {
    title: "Accountability & Performance Coaching",
    description:
      "Breaking through performance ceilings with focus, accountability, and practical execution — structure, not hype.",
  },
  {
    title: "Life & Business Coaching",
    description:
      "Faith-aligned coaching for entrepreneurs and leaders who want success that actually equals freedom.",
  },
  {
    title: "Mastermind Facilitation",
    description:
      "Leading rooms of men and high performers who sharpen one another and stay accountable for the long haul.",
  },
  {
    title: "Speaking & Strategy Sessions",
    description:
      "Keynotes and strategy sessions that blend elite mindset mastery with a clear, practical path forward.",
  },
]

const marcEndorsements = testimonials.slice(0, 4)

function AboutMarcPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div
          className="absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            backgroundImage:
              "radial-gradient(closest-side, var(--flame-orange), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            About Marc Feinberg
          </span>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Forgiveness Equals Freedom.
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            High-performance coach, certified biblical counselor, author, and keynote speaker. Marc
            helps athletes, entrepreneurs, and leaders release what holds them back and step into
            purpose, focus, and power.
          </p>
        </div>
      </section>

      <GradientSection variant="cream">
        <div className="grid gap-6 sm:grid-cols-3">
          {marcStats.map((stat) => (
            <Card key={stat.label} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
                <span className="text-gradient-fire font-heading text-4xl font-bold">
                  {stat.value}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="His Story"
          title="The road back, lived first."
          description="Marc built the Faith on Fire roadmap from his own journey home to God — then spent decades helping others walk it."
        />
        <div className="mt-14">
          <FounderCard />
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="What Marc Does"
          title="Elite mindset meets practical execution"
          description="Marc blends high-performance coaching with faith-rooted counsel — for men who want a structure they can actually live."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {marcServices.map((service) => (
            <Card key={service.title} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-3 p-7">
                <span className="gradient-fire h-1 w-16 rounded-full" />
                <h3 className="text-xl">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Trusted By"
          title="Champions and leaders in his corner"
          description="Marc has advised elite athletes, founders, and leaders — from world champions to best-selling authors."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {marcEndorsements.map((item) => (
            <Card key={item.name} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-3 p-7">
                <p className="text-xl leading-relaxed text-foreground normal-case font-sans italic">
                  “{item.quote}”
                </p>
                <p className="font-heading text-sm font-semibold text-[var(--fire-red)]">
                  {item.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Go Deeper"
            title="More from Marc"
            description="Explore Marc's full coaching, speaking, and mastermind work — for athletes, entrepreneurs, and leaders."
          />
          <a
            href="https://marcfeinberg.com/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground/15 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wide normal-case text-foreground transition-all duration-200 hover:border-[var(--fire-red)] hover:text-[var(--fire-red)]"
          >
            Visit marcfeinberg.com
            <HugeiconsIcon
              icon={Link01Icon}
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </a>
        </div>
      </GradientSection>

      <FireCtaSection
        eyebrow="Walk With Marc"
        title="His story is proof yours isn't over."
        description={`“${founder.quote}”`}
        ctaLabel="Join the Brotherhood"
        ctaHref="/mastermind"
      />
    </>
  )
}
