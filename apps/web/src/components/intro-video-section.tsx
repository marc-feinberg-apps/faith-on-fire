import { useRef, useState } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Book01Icon,
  Compass01Icon,
  UserGroup03Icon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"

const introVideoUrl =
  import.meta.env.VITE_INTRO_VIDEO_URL || "/assets/video/intro-placeholder.mp4"

const sellCards = [
  {
    icon: Book01Icon,
    eyebrow: "The E-book",
    title: "Get the E-book",
    description: "Start the Faith on Fire Blueprint today.",
    ctaLabel: "Get the E-book",
    href:
      import.meta.env.VITE_SAMCART_EBOOK_URL ||
      "https://samcart.com/placeholder-faith-on-fire-ebook",
    external: true,
  },
  {
    icon: Compass01Icon,
    eyebrow: "The Course",
    title: "The Blueprint",
    description: "The 10-module roadmap to return, restore, reignite.",
    ctaLabel: "Explore the Blueprint",
    href: "/blueprint",
    external: false,
  },
  {
    icon: UserGroup03Icon,
    eyebrow: "The Brotherhood",
    title: "Weekly Mastermind",
    description: "Real accountability. Brothers for life.",
    ctaLabel: "Find Your People",
    href: "/join",
    external: false,
  },
] as const

export function IntroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleSound() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    if (video.paused) void video.play().catch(() => {})
    setMuted(video.muted)
  }

  return (
    <section className="relative flex flex-col gap-8 overflow-hidden bg-[var(--ember-dark)] px-4 pt-10 pb-16 sm:gap-10 sm:px-6 sm:pt-14 sm:pb-24">
      {/* ambient fire glow */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 size-[80vw] max-w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(closest-side, var(--flame-orange), var(--fire-red) 55%, transparent)",
        }}
      />
      {/* soft glow easing into the next section so the boundary doesn't read as a hard edge */}
      <div
        className="pointer-events-none absolute -bottom-1/4 left-1/2 size-[70vw] max-w-[760px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(closest-side, var(--fire-red), transparent)",
        }}
      />

      {/* video */}
      <div className="group relative z-10 mx-auto w-full max-w-4xl">
        {/* gradient glow frame */}
        <div className="gradient-fire absolute -inset-px rounded-[1.4rem] opacity-70 blur-[2px]" />
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.3rem] shadow-2xl shadow-black/50 ring-1 ring-white/10">
          <video
            ref={videoRef}
            src={introVideoUrl}
            poster="/assets/brand/marc-feinberg-founder.jpeg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover"
          />
          {/* cinematic vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

          {/* sound prompt — designed to pop */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Tap for sound" : "Mute video"}
            className="absolute right-3 bottom-3 z-10 inline-flex items-center sm:right-5 sm:bottom-5"
          >
            {muted ? (
              <span className="animate-sound-bob relative inline-flex items-center gap-2.5 rounded-full gradient-fire py-2.5 pr-5 pl-3 shadow-xl shadow-[var(--fire-red)]/40 ring-1 ring-white/30 transition-transform hover:scale-105">
                {/* pulsing rings */}
                <span className="absolute left-3 inline-flex size-9 rounded-full bg-white/40">
                  <span className="animate-sound-ring absolute inset-0 rounded-full bg-white/50" />
                </span>
                <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-white/20">
                  <HugeiconsIcon
                    icon={VolumeOffIcon}
                    className="size-5 text-white"
                    strokeWidth={2.2}
                  />
                </span>
                <span className="relative font-heading text-sm font-bold tracking-wide text-white uppercase">
                  Tap for Sound
                </span>
              </span>
            ) : (
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/75">
                <HugeiconsIcon
                  icon={VolumeHighIcon}
                  className="size-5"
                  strokeWidth={2.2}
                />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* three offer cards */}
      <div className="relative z-10 mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {sellCards.map((card, i) => {
          const inner = (
            <>
              {/* hover glow */}
              <div className="gradient-fire pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-10" />
              <div className="relative flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl gradient-fire text-white shadow-lg shadow-[var(--fire-red)]/30 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6">
                  <HugeiconsIcon icon={card.icon} className="size-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <span className="font-heading text-[0.65rem] font-semibold tracking-[0.18em] text-[var(--sun-gold)] uppercase">
                    {card.eyebrow}
                  </span>
                  <h3 className="font-heading text-base leading-tight font-bold text-white sm:text-lg">
                    {card.title}
                  </h3>
                </div>
              </div>
              <p className="relative mt-2 text-sm leading-snug text-white/70 normal-case font-sans">
                {card.description}
              </p>
              <span className="relative mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors group-hover/card:text-[var(--sun-gold)]">
                {card.ctaLabel}
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-4 transition-transform group-hover/card:translate-x-1"
                  strokeWidth={2.5}
                />
              </span>
            </>
          )

          const cardClass =
            "animate-fade-in-up group/card relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sun-gold)]/40 hover:bg-white/[0.1] hover:shadow-xl hover:shadow-black/40 sm:p-5"

          return card.external ? (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noreferrer"
              className={cardClass}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={card.title}
              to={card.href}
              className={cardClass}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              {inner}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
