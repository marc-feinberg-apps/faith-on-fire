import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Download04Icon, Loading03Icon } from "@hugeicons/core-free-icons"

interface WorkbookDownloadToastProps {
  onDownload: () => Promise<boolean>
  onDismiss: () => void
}

// Content rendered inside a sonner `toast.custom()` call — sonner owns
// positioning/animation/stacking, this is just the card. Manages its own
// loading state since it stays mounted (as a normal React component) for the
// life of the toast.
export function WorkbookDownloadToast({ onDownload, onDismiss }: WorkbookDownloadToastProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleDownload() {
    setIsLoading(true)
    try {
      await onDownload()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-72 rounded-xl bg-black/90 p-3 text-white shadow-xl ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="font-heading text-[0.65rem] font-semibold tracking-wide text-[var(--sun-gold)] uppercase normal-case">
          Members-Only Perk
        </span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" />
        </button>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-white/90 normal-case font-sans">
        Download your Course Blueprint Workbook and keep it open alongside this lesson.
      </p>

      <button
        type="button"
        onClick={() => void handleDownload()}
        disabled={isLoading}
        className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[var(--sun-gold)] px-3 py-1.5 font-heading text-xs font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70 normal-case"
      >
        <HugeiconsIcon icon={isLoading ? Loading03Icon : Download04Icon} className={isLoading ? "size-3.5 animate-spin" : "size-3.5"} />
        {isLoading ? "Loading…" : "Download Workbook"}
      </button>
    </div>
  )
}
