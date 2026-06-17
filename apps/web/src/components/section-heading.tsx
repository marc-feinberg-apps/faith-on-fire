import { cn } from "@workspace/ui/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "font-heading text-sm font-semibold tracking-[0.2em]",
            light ? "text-[var(--sun-gold)]" : "text-gradient-fire"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "max-w-3xl text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg normal-case font-sans",
            light ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
