import { createFileRoute } from "@tanstack/react-router"
import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { ModuleCard } from "@/components/module-card"
import { ResourceCard } from "@/components/resource-card"
import { FireCtaSection } from "@/components/fire-cta-section"
import { BuyButton } from "@/components/buy-button"
import { FaqSection } from "@/components/faq-section"
import { TestimonialVideoGrid } from "@/components/testimonial-marquee"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import {
  blueprintModules,
  commitmentLetters,
  courseCoverUrl,
  courseFaqs,
  moduleTools,
  pricing,
  resources,
  scriptureAnchors,
  siteConfig,
  testimonials,
} from "@/data/site"
import type { SiteIconName } from "@/components/site-icon"

const courseTitle = "The Faith on Fire Course — 10 Modules to Return, Restore, Reignite"
const courseDescription =
  "The Faith on Fire Course — 10 modules from Wake-Up Call to The Invitation, with commitment letters, scripture anchors, and the full workbook toolset."

export const Route = createFileRoute("/course")({
  head: () => ({
    meta: [
      { title: `${courseTitle} | Faith on Fire` },
      {
        name: "description",
        content: courseDescription,
      },
      { property: "og:title", content: courseTitle },
      { property: "og:description", content: courseDescription },
      { property: "og:image", content: siteConfig.ogImage },
      { property: "og:url", content: `${siteConfig.url}/course` },
      { name: "twitter:title", content: courseTitle },
      { name: "twitter:description", content: courseDescription },
      { name: "twitter:image", content: siteConfig.ogImage },
    ],
  }),
  component: CoursePage,
})

function CoursePage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${courseCoverUrl})`, backgroundPosition: "80% center" }}
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
          <Badge className="gradient-fire border-none px-4 py-1.5 text-sm font-semibold tracking-[0.15em] text-white">
            THE FAITH ON FIRE COURSE · 10 MODULES
          </Badge>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            This is not passive content.
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            It is an interactive transformation guide. Every module follows the same structure:
            Key Teaching, Reflection Questions, Declaration, and This Week&apos;s Action Step.
          </p>
          <p className="font-heading text-xl text-[var(--sun-gold)]">
            Your breakthrough is in the work.
          </p>
          <div className="mt-2 flex flex-col items-center gap-2">
            <BuyButton product="course" tone="light">Buy the Course</BuyButton>
            <p className="font-heading text-sm text-white/60 normal-case">
              {pricing.course.guarantee}
            </p>
          </div>
        </div>
      </section>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="10 Modules"
          title="The Roadmap, Module by Module"
          description="From the wake-up call to the invitation — each module follows the workbook structure of Key Teaching, Reflection Questions, Declaration, and This Week's Action Step."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blueprintModules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Commitment Letters"
          title="Three signed moments of decision"
          description="The workbook anchors each pillar with a letter read aloud and signed before a witness, so the course moves from reflection into obedience."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitmentLetters.map((letter) => (
            <Card key={letter.title} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--fire-red)]">
                  {letter.pillar}
                </span>
                <h3 className="text-lg">{letter.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {letter.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Workbook Tools"
          title="Practical tools, organized by module"
          description="Every tool below is included inside the Faith on Fire Workbook, so the resources match the module sequence you walk through."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.title}
              title={resource.title}
              description={resource.description}
              icon={resource.icon as SiteIconName}
            />
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moduleTools.map((tool) => (
            <Card
              key={`${tool.module}-${tool.title}`}
              className="border-none p-0 ring-1 ring-foreground/10"
            >
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{tool.module}</Badge>
                  <Badge className="gradient-fire border-none text-white">{tool.source}</Badge>
                </div>
                <h3 className="text-lg">{tool.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Scripture Anchors"
          title="Verses that hold the journey together"
          description="The course keeps the roadmap rooted in Scripture, from repentance and renewal to brotherhood and calling."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scriptureAnchors.map((anchor) => (
            <Card key={anchor.reference} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex h-full flex-col gap-2 p-5">
                <h3 className="text-lg">{anchor.reference}</h3>
                <p className="font-heading text-xs font-semibold tracking-[0.16em] text-[var(--fire-red)]">
                  {anchor.theme}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                  {anchor.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <GradientSection variant="cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Get The Course"
            title="Get instant access to all 10 modules."
            description="All 10 modules, the commitment letters, the workbook tools, and the scripture anchors — yours to keep."
          />
          <BuyButton product="course">Buy the Course</BuyButton>
          <p className="font-heading text-sm text-muted-foreground normal-case">
            {pricing.course.guarantee}
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
          <TestimonialVideoGrid testimonials={testimonials} />
        </div>
      </GradientSection>

      <FaqSection items={courseFaqs} variant="cream" />

      <FireCtaSection
        title="You've read the map. Now walk the road."
        description="The Faith on Fire Course comes alive inside the Weekly Mastermind / Brotherhood — with men who will walk every module with you."
        ctaLabel="Join the Mastermind"
        ctaHref="/mastermind"
      />
    </>
  )
}
