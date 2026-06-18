import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteDownIcon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

type Testimonial = { quote: string; name: string }

function TestimonialBox({ quote, name }: Testimonial) {
  return (
    <div className="flex w-80 shrink-0 flex-col gap-3 rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
      <HugeiconsIcon icon={QuoteDownIcon} className="size-5 text-[var(--flame-orange)]" />
      <p className="text-sm leading-relaxed text-foreground normal-case font-sans italic">
        “{quote}”
      </p>
      <span className="font-heading text-xs font-semibold text-muted-foreground">— {name}</span>
    </div>
  )
}

function MarqueeRow({
  testimonials,
  direction,
  duration,
}: {
  testimonials: Testimonial[]
  direction: "left" | "right"
  duration: number
}) {
  return (
    <div className="group relative w-full overflow-hidden mask-fade-x">
      <div
        className={cn(
          "flex w-max gap-5 group-hover:[animation-play-state:paused]",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialBox key={`${testimonial.name}-${index}`} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialMarqueeGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const rows: Testimonial[][] = [[], []]
  testimonials.forEach((testimonial, index) => {
    rows[index % 2]!.push(testimonial)
  })

  return (
    <div className="flex flex-col gap-5">
      <MarqueeRow testimonials={rows[0]!} direction="left" duration={32} />
      <MarqueeRow testimonials={rows[1]!} direction="right" duration={36} />
    </div>
  )
}
