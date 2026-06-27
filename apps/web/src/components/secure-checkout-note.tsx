import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkBadge01Icon, SecurityLockIcon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

// Reassurance shown next to a purchase CTA: confirms payment is handled securely
// and tells the buyer what happens immediately after they pay. Reduces hesitation
// at the money step.
export function SecureCheckoutNote({
  className,
  tone = "dark",
}: {
  className?: string
  /** "light" for use over dark/ember backgrounds. */
  tone?: "light" | "dark"
}) {
  const muted = tone === "light" ? "text-white/70" : "text-muted-foreground"
  const accent = tone === "light" ? "text-white" : "text-[var(--fire-red)]"

  return (
    <div className={cn("flex flex-col items-center gap-1.5 text-center", className)}>
      <p className={cn("inline-flex items-center gap-1.5 text-xs font-medium", muted)}>
        <HugeiconsIcon icon={SecurityLockIcon} className={cn("size-3.5", accent)} strokeWidth={2} />
        Secure checkout via Stripe
      </p>
      <p className={cn("inline-flex items-center gap-1.5 text-xs", muted)}>
        <HugeiconsIcon icon={CheckmarkBadge01Icon} className={cn("size-3.5", accent)} strokeWidth={2} />
        Instant access right after payment
      </p>
    </div>
  )
}
