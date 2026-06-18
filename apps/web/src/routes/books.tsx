import { createFileRoute } from "@tanstack/react-router"

import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import { BookCard } from "@/components/book-card"
import { FireCtaSection } from "@/components/fire-cta-section"
import { books } from "@/data/site"

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books | Faith on Fire" },
      {
        name: "description",
        content:
          "Books by Marc Feinberg — practical resources on biblical wisdom, parenting, teens, money, freedom, and personal growth.",
      },
    ],
  }),
  component: BooksPage,
})

function BooksPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 gradient-ember" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
            Books by Marc Feinberg
          </span>
          <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Wisdom for Faith, Family & Freedom
          </h1>
          <p className="text-lg leading-relaxed text-white/80 normal-case font-sans">
            Wisdom, freedom, power, and purpose in practical resources for faith, family, teens,
            money, and personal growth.
          </p>
        </div>
      </section>

      <GradientSection variant="cream">
        <SectionHeading
          eyebrow="The Library"
          title="Apply Marc's principles one page at a time."
          description="Each book is available on Amazon. Tap any cover to read more and grab your copy."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.title}
              title={book.title}
              subtitle={book.subtitle}
              description={book.description}
              image={book.image}
              url={book.url}
            />
          ))}
        </div>
      </GradientSection>

      <FireCtaSection
        title="Want help applying these principles personally?"
        description="The fire burns brightest in brotherhood — turn insight into accountability and breakthrough."
        ctaLabel="Join the Brotherhood"
      />
    </>
  )
}
