import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"

const placeholderSamcartUrl =
  "https://samcart.com/placeholder-faith-on-fire-ebook"

const ebookPurchaseUrl =
  import.meta.env.VITE_SAMCART_EBOOK_URL || placeholderSamcartUrl

export function EbookPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1200)

    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) {
    return null
  }

  function handleDismiss() {
    setVisible(false)
  }

  return (
    <aside
      aria-label="Faith on Fire e-book offer"
      className="fixed right-4 bottom-4 left-4 z-[60] mx-auto max-w-sm animate-[ebook-popup-slide-up_320ms_ease-out] rounded-lg border border-foreground/10 bg-white p-4 shadow-2xl shadow-black/20 sm:right-6 sm:bottom-6 sm:left-auto"
    >
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Dismiss e-book offer"
      >
        <HugeiconsIcon icon={Cancel01Icon} className="size-4" strokeWidth={2} />
      </button>

      <div className="flex gap-3 pr-7">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--fire-red)]/10 text-[var(--fire-red)]">
          <HugeiconsIcon
            icon={BookOpen01Icon}
            className="size-5"
            strokeWidth={2}
          />
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="font-heading text-base leading-tight font-semibold tracking-normal text-foreground uppercase">
              Get the E-book
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start the Faith on Fire Blueprint with the e-book today.
            </p>
          </div>

          <Button
            asChild
            className="h-9 w-full gap-2 bg-[var(--fire-red)] hover:bg-[var(--fire-red)]/85"
          >
            <a href={ebookPurchaseUrl} target="_blank" rel="noreferrer">
              Get the E-book
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4"
                strokeWidth={2}
              />
            </a>
          </Button>
        </div>
      </div>
    </aside>
  )
}
