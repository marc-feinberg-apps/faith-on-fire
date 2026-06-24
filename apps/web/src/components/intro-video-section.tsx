import { useRef, useState } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"

import { SiteIcon } from "@/components/site-icon"
import { introVideoUrl, offers } from "@/data/site"

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

      {/* headline */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
        <span className="font-heading text-sm font-semibold tracking-[0.25em] text-[var(--sun-gold)]">
          A Brotherhood for Men Who Refuse to Drift
        </span>
        <h1 className="text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Return. Restore. Reignite.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/75 normal-case font-sans sm:text-lg">
          Helping men return to God, restore relationships, and reignite their purpose in life.
        </p>
      </div>

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
      <div className="relative z-10 mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {offers.map((card, i) => {
          const cardClass =
            "animate-fade-in-up group/card relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sun-gold)]/40 hover:bg-white/[0.1] hover:shadow-xl hover:shadow-black/40"

          return (
            <Link
              key={card.title}
              to={card.href}
              className={cardClass}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              {/* image — every card shares the same aspect ratio so the row stays uniform */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ objectPosition: card.imagePosition }}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                ) : (
                  <div className="gradient-fire absolute inset-0 flex items-center justify-center">
                    <SiteIcon name={card.icon} className="size-14 text-white/85" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                {!card.image && (
                  <span className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 font-heading text-[0.6rem] font-semibold tracking-[0.15em] text-white/80 uppercase ring-1 ring-white/20">
                    Coming Soon
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl gradient-fire text-white shadow-lg shadow-[var(--fire-red)]/30 ring-1 ring-white/20 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6">
                    <SiteIcon name={card.icon} className="size-5" />
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
              </div>

              {/* content */}
              <div className="relative flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="gradient-fire pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-10" />
                <p className="relative flex-1 text-sm leading-snug text-white/70 normal-case font-sans">
                  {card.description}
                </p>
                <span className="relative flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors group-hover/card:text-[var(--sun-gold)]">
                    {card.ctaLabel}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-4 transition-transform group-hover/card:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
