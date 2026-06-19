import { useState } from "react"

import { Card, CardContent } from "@workspace/ui/components/card"

type Testimonial = {
  quote: string
  name: string
  videoUrl: string
  videoId: string
  videoStart?: number
}

function TestimonialVideoCard({ quote, name, videoId, videoStart }: Testimonial) {
  const [isPlaying, setIsPlaying] = useState(false)
  const embedParams = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
  })

  if (videoStart) {
    embedParams.set("start", String(videoStart))
  }

  return (
    <Card className="h-full gap-4 overflow-hidden border border-foreground/10 bg-card p-0 shadow-sm">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="overflow-hidden rounded-lg bg-[var(--charcoal)]">
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
              className="group relative block aspect-video w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              aria-label={`Play ${name} testimonial video`}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover opacity-90 transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-black/10" aria-hidden="true" />
              <span className="absolute left-3 bottom-3 flex items-center gap-2 rounded-full bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                <span
                  className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current"
                  aria-hidden="true"
                />
                Play
              </span>
            </button>
          )}
        </div>
        <blockquote className="flex flex-1 flex-col gap-3">
          <p className="text-sm leading-relaxed text-foreground normal-case font-sans italic">
            “{quote}”
          </p>
          <cite className="font-heading text-xs font-semibold not-italic text-muted-foreground">
            {name}
          </cite>
        </blockquote>
      </CardContent>
    </Card>
  )
}

export function TestimonialVideoGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialVideoCard key={testimonial.videoId} {...testimonial} />
      ))}
    </div>
  )
}
