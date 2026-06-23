import { createFileRoute } from "@tanstack/react-router"
import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { ModuleCard } from "@/components/module-card"
import { FireCtaSection } from "@/components/fire-cta-section"
import { BuyButton } from "@/components/buy-button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { blueprintModules, commitmentLetters, scriptureAnchors } from "@/data/site"

export const Route = createFileRoute("/blueprint")({
  head: () => ({
    meta: [
      { title: "The Blueprint | Faith on Fire" },
      {
        name: "description",
        content:
          "The Faith on Fire Blueprint — 10 modules from Wake-Up Call to The Invitation. Key teaching, reflection questions, declaration, and a weekly action step.",
      },
    ],
  }),
  component: BlueprintPage,
})

function BlueprintPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            The Faith on Fire Blueprint
          </span>
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
          description="The workbook anchors each pillar with a letter read aloud and signed before a witness, so the Blueprint moves from reflection into obedience."
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
          eyebrow="Scripture Anchors"
          title="Verses that hold the journey together"
          description="The ebook and workbook keep the roadmap rooted in Scripture, from repentance and renewal to brotherhood and calling."
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

      <GradientSection variant="white">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Get The Blueprint"
            title="Get instant access to the full course."
            description="All 10 modules, the commitment letters, and the scripture anchors — yours to keep."
          />
          <BuyButton product="course">Buy the Course</BuyButton>
        </div>
      </GradientSection>

      <FireCtaSection
        title="You've read the map. Now walk the road."
        description="The Faith on Fire Blueprint comes alive inside the Weekly Mastermind / Brotherhood — with men who will walk every module with you."
        ctaLabel="Join the Brotherhood"
      />
    </>
  )
}
