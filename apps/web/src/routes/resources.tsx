import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Download01Icon } from "@hugeicons/core-free-icons"

import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { ResourceCard } from "@/components/resource-card"
import { FireCtaSection } from "@/components/fire-cta-section"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { downloads, moduleTools, resources, scriptureAnchors } from "@/data/site"
import type { SiteIconName } from "@/components/site-icon"

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources | Faith on Fire" },
      {
        name: "description",
        content:
          "Men's accountability groups, faith study workbooks, prayer rhythms, scripture anchors, the 24-Hour Recovery Plan, and the New Man Declaration.",
      },
    ],
  }),
  component: ResourcesPage,
})

function ResourcesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            Resources For Your Journey
          </span>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Tools to Keep the Fire Burning
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            Practical resources pulled directly from the Faith on Fire Blueprint — built to be
            used, not just read.
          </p>
        </div>
      </section>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Resource Themes"
          title="Practices from the ebook and workbook"
          description="These are the repeated practices Faith on Fire returns to across the Blueprint."
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
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Workbook Tools"
          title="Organized by module"
          description="Every tool below is included inside the Faith on Fire Workbook, so the resources match the module sequence men are walking through."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Scripture Anchors"
          title="A pocket reference for the journey"
          description="The standalone pocket reference is not published yet, so these anchors are shown here and in the workbook-backed Blueprint."
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
        <SectionHeading
          eyebrow="Downloadable"
          title="Take the Blueprint With You"
          description="Download the files currently available on the site. Standalone templates will appear here once their PDFs are published."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {downloads.map((item) => (
            <Card key={item.title} className="border-none p-0 ring-1 ring-foreground/10">
              <CardContent className="flex items-center justify-between gap-4 p-6">
                <div>
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.href}
                  className="gradient-fire flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
                  aria-label={`Download ${item.title}`}
                >
                  <HugeiconsIcon icon={Download01Icon} className="size-5" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </GradientSection>

      <FireCtaSection
        title="The breakthrough is in the work."
        description="These tools are most powerful inside the brotherhood — where you have a brother holding you to them."
        ctaLabel="Join the Brotherhood"
      />
    </>
  )
}
