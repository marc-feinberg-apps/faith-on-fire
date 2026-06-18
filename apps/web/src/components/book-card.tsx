import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Card, CardContent } from "@workspace/ui/components/card"

export function BookCard({
  title,
  subtitle,
  description,
  image,
  url,
}: {
  title: string
  subtitle: string
  description: string
  image: string
  url: string
}) {
  return (
    <Card className="group overflow-hidden border-none p-0 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-xl">
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
        <div className="flex items-center justify-center bg-muted/40 p-6">
          <img
            src={image}
            alt={`${title} book cover`}
            loading="lazy"
            className="h-64 w-auto rounded-md object-contain shadow-lg transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 p-6">
          <h3 className="text-lg">{title}</h3>
          <p className="font-heading text-xs font-semibold tracking-[0.16em] text-[var(--fire-red)]">
            {subtitle}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            {description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-[var(--fire-red)]">
            View on Amazon
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </span>
        </CardContent>
      </a>
    </Card>
  )
}
