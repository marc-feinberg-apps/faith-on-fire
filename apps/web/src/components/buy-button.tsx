import { useState } from "react"
import { useServerFn } from "@tanstack/react-start"
import { useRouteContext } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"

import { createCheckoutSession } from "@/server/checkout"
import { OwnedNotice } from "@/components/owned-notice"
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
}: {
  product: Product
  children: React.ReactNode
  className?: string
  tone?: "light" | "dark"
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
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-heading text-base font-semibold uppercase tracking-wide normal-case transition-all duration-200",
          "gradient-fire text-white shadow-lg shadow-[var(--fire-red)]/25 hover:scale-[1.03] hover:shadow-xl hover:shadow-[var(--fire-red)]/35",
          "disabled:pointer-events-none disabled:opacity-70",
          className,
        )}
      >
        {isLoading ? "Redirecting..." : children}
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 transition-transform group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      </button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
