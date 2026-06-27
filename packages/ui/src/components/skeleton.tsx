import { cn } from "@workspace/ui/lib/utils"

// Animated placeholder used by route pendingComponents so loading layouts hold
// their shape instead of collapsing. The pulse is disabled under
// prefers-reduced-motion via the global stylesheet.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-foreground/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
