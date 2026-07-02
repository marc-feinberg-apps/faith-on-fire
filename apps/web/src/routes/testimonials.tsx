import { createFileRoute } from "@tanstack/react-router"

import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { FireCtaSection } from "@/components/fire-cta-section"
import { TestimonialVideoGrid } from "@/components/testimonial-marquee"
import { faithOnFireTestimonials, testimonials } from "@/data/site"

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Faith on Fire" },
      {
        name: "description",
        content:
          "Video testimonials from people who have experienced Marc Feinberg's coaching, teaching, and guidance.",
      },
    ],
  }),
  component: TestimonialsPage,
})

function TestimonialsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            Testimonials
          </span>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            What People Are Saying
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            Watch real voices share what Marc's coaching, teaching, and guidance have meant in their
            lives.
          </p>
        </div>
      </section>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="Faith on Fire Testimony Spotlight"
          title="Stories from the Faith on Fire road"
          description="These testimonies speak directly to what God is doing through Faith on Fire."
        />
        <div className="mt-14">
          <TestimonialVideoGrid testimonials={faithOnFireTestimonials} />
        </div>
      </GradientSection>

      <GradientSection variant="white">
        <SectionHeading
          eyebrow="Video Testimonials"
          title="More real voices, real transformation"
          description="From champions in the ring to leaders and everyday men — hear it in their own words."
        />
        <div className="mt-14">
          <TestimonialVideoGrid testimonials={testimonials} />
        </div>
      </GradientSection>

      <FireCtaSection
        title="Your story could be next."
        description="The fire burns brightest in brotherhood — turn insight into accountability and breakthrough."
        ctaLabel="Join the Brotherhood"
        ctaHref="/mastermind"
      />
    </>
  )
}
