import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

// Mirror of CtaButton, but renders an external anchor instead of a router Link.
// Used for offers that hand off to an external checkout (e.g. the SamCart ebook).
export function ExternalCtaButton({
  href,
  children,
  variant = "fire",
  size = "lg",
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: "fire" | "outline" | "ghost-light"
  size?: "default" | "lg"
  className?: string
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold uppercase tracking-wide transition-all duration-200 normal-case"
  const sizes = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
  const variants = {
    fire: "gradient-fire text-white shadow-lg shadow-[var(--fire-red)]/25 hover:scale-[1.03] hover:shadow-xl hover:shadow-[var(--fire-red)]/35",
    outline:
      "border-2 border-foreground/15 text-foreground hover:border-[var(--fire-red)] hover:text-[var(--fire-red)]",
    "ghost-light":
      "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60",
  }

  // No destination configured (e.g. the SamCart URL env var is unset): render a
  // disabled button rather than an anchor to nowhere.
  if (!href) {
    return (
      <button
        type="button"
        disabled
        className={cn(base, sizes, variants[variant], "cursor-not-allowed opacity-60", className)}
      >
        {children}
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(base, sizes, variants[variant], className)}
    >
      {children}
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        className="size-4 transition-transform group-hover:translate-x-1"
        strokeWidth={2.5}
      />
    </a>
  )
}
