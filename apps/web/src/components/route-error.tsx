import { Link, useRouter } from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon, RefreshIcon, Home01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@workspace/ui/components/button"

// Shared, friendly fallback for any route whose loader or render throws. Instead
// of a blank screen the user gets a calm explanation and a way back — a retry
// that re-runs the failed loaders, plus links home and to support.
export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  if (import.meta.env.DEV) {
    console.error(error)
  }

  async function handleRetry() {
    reset()
    await router.invalidate()
  }

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <HugeiconsIcon icon={Alert02Icon} className="size-8" />
      </span>
      <div className="space-y-2">
        <h1 className="text-3xl text-foreground">Something went wrong</h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          We hit a snag loading this page. It's on us, not you — give it another try, and if it
          keeps happening reach out and we'll sort it out.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button onClick={handleRetry} className="gradient-fire gap-2 text-white">
          <HugeiconsIcon icon={RefreshIcon} className="size-4" />
          Try again
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link to="/">
            <HugeiconsIcon icon={Home01Icon} className="size-4" />
            Back to home
          </Link>
        </Button>
      </div>
      <Link
        to="/contact"
        className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-[var(--fire-red)] hover:underline"
      >
        Contact support
      </Link>
    </main>
  )
}
