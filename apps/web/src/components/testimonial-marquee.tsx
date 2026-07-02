import { useState } from "react"

import { Card, CardContent } from "@workspace/ui/components/card"

type Testimonial = {
  headline?: string
  quote: string
  name: string
  videoUrl: string
  videoId: string
  videoStart?: number
}

function TestimonialVideoCard({ headline, quote, name, videoId, videoStart }: Testimonial) {
  const [isPlaying, setIsPlaying] = useState(false)
  const embedParams = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
  })

  if (videoStart) {
    embedParams.set("start", String(videoStart))
  }

  const [personName, ...titleParts] = name.split(",")
  const title = titleParts.join(",").trim()

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl border border-foreground/10 bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--ember)]/10">
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--ember)] via-[var(--sun-gold)] to-[var(--ember)]" />
      <CardContent className="flex h-full flex-col gap-5 p-6">
        <div className="overflow-hidden rounded-xl bg-[var(--charcoal)] shadow-inner">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?${embedParams.toString()}`}
              title={`${name} testimonial video`}
              className="aspect-video w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group/play relative block aspect-video w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              aria-label={`Play ${name} testimonial video`}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover/play:scale-105"
                loading="lazy"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 transition-colors duration-300 group-hover/play:from-black/80"
                aria-hidden="true"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover/play:scale-110">
                  <span
                    className="ml-0.5 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-[var(--ember)]"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </button>
          )}
        </div>
        <blockquote className="flex flex-1 flex-col gap-3">
          {headline && (
            <h3 className="font-heading text-xl leading-tight text-foreground">
              {headline}
            </h3>
          )}
          <span className="font-heading text-3xl leading-none text-[var(--sun-gold)]" aria-hidden="true">
            “
          </span>
          <p className="-mt-4 text-sm leading-relaxed text-foreground normal-case font-sans italic">
            {quote}
          </p>
          <div className="mt-auto flex flex-col border-t border-foreground/10 pt-3">
            <cite className="font-heading text-sm font-semibold not-italic text-foreground">
              {personName}
            </cite>
            {title && (
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--ember)]">
                {title}
              </span>
            )}
          </div>
        </blockquote>
      </CardContent>
    </Card>
  )
}

export function TestimonialVideoGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      {testimonials.map((testimonial) => (
        <TestimonialVideoCard key={testimonial.videoId} {...testimonial} />
      ))}
    </div>
  )
}
