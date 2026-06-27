import { useState } from "react"
import { useServerFn } from "@tanstack/react-start"
import { useRouteContext } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Loading03Icon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"
import { toast } from "@workspace/ui/components/sonner"

import { createCheckoutSession } from "@/server/checkout"
import { OwnedNotice } from "@/components/owned-notice"
import { SecureCheckoutNote } from "@/components/secure-checkout-note"
import type { Product } from "@/lib/checkout-form"

const ownedLabels: Record<Product, string> = {
  course: "You already own the Course",
  mastermind: "You're already in the Mastermind",
}

export function BuyButton({
  product,
  children,
  className,
  tone = "dark",
  trust = true,
}: {
  product: Product
  children: React.ReactNode
  className?: string
  tone?: "light" | "dark"
  /** Show the "secure checkout / instant access" reassurance under the button. */
  trust?: boolean
}) {
  const createCheckoutSessionFn = useServerFn(createCheckoutSession)
  const { access } = useRouteContext({ from: "__root__" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // A Mastermind subscription unlocks the Course too, so a member who has
  // Mastermind can't re-buy the Course either.
  const owned = product === "mastermind" ? access.hasMastermind : access.hasCourse

  if (owned) {
    return <OwnedNotice tone={tone}>{ownedLabels[product]}</OwnedNotice>
  }

  async function handleClick() {
    setError("")
    setIsLoading(true)
    try {
      const { url } = await createCheckoutSessionFn({ data: { product } })
      window.location.href = url
    } catch {
      setError("We couldn't start checkout. Please try again.")
      toast.error("We couldn't start checkout.", {
        description: "No charge was made. Please try again in a moment.",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        aria-busy={isLoading || undefined}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-heading text-base font-semibold uppercase tracking-wide normal-case transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fire-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "gradient-fire text-white shadow-lg shadow-[var(--fire-red)]/25 hover:scale-[1.03] motion-reduce:hover:scale-100 hover:shadow-xl hover:shadow-[var(--fire-red)]/35",
          "disabled:pointer-events-none disabled:opacity-70",
          className,
        )}
      >
        {isLoading ? "Redirecting..." : children}
        <HugeiconsIcon
          icon={isLoading ? Loading03Icon : ArrowRight01Icon}
          className={cn("size-4 transition-transform", isLoading ? "animate-spin" : "group-hover:translate-x-1")}
          strokeWidth={2.5}
        />
      </button>
      {trust ? <SecureCheckoutNote tone={tone} /> : null}
      {error ? (
        <p role="alert" aria-live="polite" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
