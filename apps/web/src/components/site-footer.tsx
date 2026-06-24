import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon } from "@hugeicons/core-free-icons"
import { Separator } from "@workspace/ui/components/separator"
import { siteConfig, pillars, navLinks } from "@/data/site"

export function SiteFooter() {
  return (
    <footer className="gradient-ember text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="w-fit rounded-xl border border-white/25 bg-white px-4 py-3 shadow-lg shadow-black/20">
              <img
                src="/assets/brand/faith-on-fire-logo-transparent.png"
                alt="Faith on Fire"
                width={1376}
                height={708}
                className="h-auto w-56 max-w-full object-contain drop-shadow-[0_0_24px_rgba(255,140,40,0.2)] sm:w-64"
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70 normal-case font-sans">
              {siteConfig.supportingLine}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-white/55 normal-case font-sans">
              Faith on Fire helps men come home to God, make peace with the man in the mirror, and
              rediscover their assignment inside a brotherhood that keeps the fire burning.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
              The Three Pillars
            </span>
            <ul className="flex flex-col gap-2 text-sm text-white/70 normal-case font-sans">
              {pillars.map((pillar) => (
                <li key={pillar.key}>{pillar.title}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--sun-gold)]">
              Explore
            </span>
            <ul className="flex flex-col gap-2 text-sm text-white/70 normal-case font-sans">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 flex items-center gap-2 text-sm text-white/70 normal-case font-sans transition-colors hover:text-white"
            >
              <HugeiconsIcon icon={Mail01Icon} className="size-4" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <Separator className="my-10 bg-white/15" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/55 normal-case font-sans sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Faith on Fire. All rights reserved.</p>
          <p className="font-heading text-[var(--sun-gold)] tracking-wide">
            {siteConfig.supportingLine}
          </p>
        </div>
      </div>
    </footer>
  )
}
