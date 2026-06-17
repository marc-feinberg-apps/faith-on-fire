import { HugeiconsIcon } from "@hugeicons/react"
import { FireIcon } from "@hugeicons/core-free-icons"
import { CtaButton } from "@/components/cta-button"

export function FireCtaSection({
  eyebrow = "The Fire Is Burning",
  title,
  description,
  ctaLabel,
  ctaHref = "/join",
}: {
  eyebrow?: string
  title: string
  description?: string
  ctaLabel: string
  ctaHref?: string
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 gradient-ember" />
      <div
        className="absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ backgroundImage: "radial-gradient(closest-side, var(--flame-orange), transparent)" }}
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-2 text-[var(--sun-gold)]">
          <HugeiconsIcon icon={FireIcon} className="size-5" strokeWidth={2} />
          <span className="font-heading text-sm font-semibold tracking-[0.2em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">{title}</h2>
        {description ? (
          <p className="max-w-xl text-lg leading-relaxed text-white/75 normal-case font-sans">
            {description}
          </p>
        ) : null}
        <CtaButton href={ctaHref} className="mt-2">
          {ctaLabel}
        </CtaButton>
      </div>
    </section>
  )
}
