import { Toaster as Sonner } from "sonner"
import type { ComponentProps } from "react"

type ToasterProps = ComponentProps<typeof Sonner>

// Brand-themed toast surface. Colors are pulled from the Faith on Fire tokens so
// confirmations and errors match the rest of the site instead of Sonner defaults.
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      gap={10}
      toastOptions={{
        classNames: {
          toast:
            "group font-sans rounded-xl border border-foreground/10 bg-card text-card-foreground shadow-xl shadow-black/10",
          title: "font-heading font-semibold tracking-tight normal-case text-sm",
          description: "text-muted-foreground text-sm",
          actionButton: "gradient-fire text-white rounded-md",
          cancelButton: "bg-muted text-muted-foreground rounded-md",
          success: "[&_[data-icon]]:text-[var(--fire-red)]",
          error: "[&_[data-icon]]:text-destructive",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
export { toast } from "sonner"
