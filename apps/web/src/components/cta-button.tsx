import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

export function CtaButton({
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
    "group inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold uppercase tracking-wide transition-all duration-200 normal-case focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fire-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  const sizes = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
  const variants = {
    fire: "gradient-fire text-white shadow-lg shadow-[var(--fire-red)]/25 hover:scale-[1.03] motion-reduce:hover:scale-100 hover:shadow-xl hover:shadow-[var(--fire-red)]/35",
    outline:
      "border-2 border-foreground/15 text-foreground hover:border-[var(--fire-red)] hover:text-[var(--fire-red)]",
    "ghost-light":
      "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60",
  }

  return (
    <Link
      to={href}
      className={cn(base, sizes, variants[variant], className)}
    >
      {children}
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        className="size-4 transition-transform group-hover:translate-x-1"
        strokeWidth={2.5}
      />
    </Link>
  )
}
