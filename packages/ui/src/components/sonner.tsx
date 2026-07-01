import { Toaster as Sonner } from "sonner"
import type { ToasterProps } from "sonner"

// Consumers must import "sonner/dist/styles.css" themselves (same convention
// as this package's own globals.css — packages/ui doesn't have Vite's CSS
// side-effect-import types configured, only apps/web does).
//
// This project has no dark-mode toggle (no next-themes, no `.dark` class ever
// applied) — always light, unlike shadcn's stock sonner.tsx which reads
// useTheme() from next-themes.
function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
