import { cn } from "@workspace/ui/lib/utils"

export function GradientSection({
  variant = "cream",
  children,
  className,
  id,
}: {
  variant?: "cream" | "ember" | "white"
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const variants = {
    cream: "gradient-warm",
    ember: "gradient-ember text-white",
    white: "bg-white",
  }

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-20 sm:py-28", variants[variant], className)}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}
