import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteDownIcon } from "@hugeicons/core-free-icons"
import { founder } from "@/data/site"

export function FounderCard() {
  return (
    <div className="grid items-center gap-10 rounded-3xl bg-card p-8 ring-1 ring-foreground/10 sm:p-12 md:grid-cols-[280px_1fr]">
      <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
        <div className="relative size-36 overflow-hidden rounded-2xl border border-foreground/10 shadow-xl shadow-black/10 sm:size-44">
          <img
            src="/assets/brand/marc-feinberg-founder.jpeg"
            alt="Marc Feinberg"
            width={1024}
            height={1024}
            className="h-full w-full object-cover object-[50%_18%]"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-xl">{founder.name}</p>
          <p className="text-sm font-semibold text-muted-foreground normal-case">{founder.role}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <HugeiconsIcon icon={QuoteDownIcon} className="size-7 text-[var(--flame-orange)]" />
        <p className="text-xl leading-relaxed text-foreground normal-case font-sans italic">
          “{founder.quote}”
        </p>
        <p className="text-base leading-relaxed text-muted-foreground normal-case font-sans">
          {founder.bio}
        </p>
      </div>
    </div>
  )
}
