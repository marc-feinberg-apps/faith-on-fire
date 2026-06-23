import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

// Shown in place of a buy/join CTA when the signed-in member already owns the
// product, so they can't purchase the same access twice. `tone="light"` is for
// dark hero sections; `tone="dark"` is for light (cream/white) sections.
export function OwnedNotice({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode
  tone?: "light" | "dark"
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 font-heading text-base font-semibold normal-case",
        tone === "light"
          ? "border-white/40 bg-white/10 text-white"
          : "border-[var(--fire-red)]/30 bg-[var(--fire-red)]/5 text-[var(--fire-red)]",
        className,
      )}
    >
      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5 shrink-0" strokeWidth={2.5} />
      {children}
    </div>
  )
}
