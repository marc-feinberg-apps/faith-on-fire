import { HugeiconsIcon } from "@hugeicons/react"
import {
  MessageQuestionIcon,
  NoteIcon,
  CheckmarkCircle02Icon,
  WrenchIcon,
} from "@hugeicons/core-free-icons"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { parseTitleParts } from "@/components/member/course-lesson-card"
import type { blueprintModules } from "@/data/site"

type BlueprintModule = (typeof blueprintModules)[number]

interface LessonDetailPanelProps {
  module: BlueprintModule
}

// The YouTube-style "description" panel below the player — surfaces the
// workbook's Key Teaching, Reflection, Declaration, Action Step, and Tool for
// this module so the watch page is a real lesson, not just a bare video.
export function LessonDetailPanel({ module }: LessonDetailPanelProps) {
  const { pillar, module: moduleTitle } = parseTitleParts(module.title)

  return (
    <Card className="border-none p-0 ring-1 ring-foreground/10">
      <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          {pillar ? (
            <span className="font-heading text-xs font-semibold tracking-[0.15em] text-[var(--fire-red)] uppercase">
              {pillar}
            </span>
          ) : null}
          <h1 className="text-2xl leading-tight text-foreground sm:text-3xl">{moduleTitle}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            {module.subtitle}
          </p>
        </div>

        <Separator />

        <p className="text-sm leading-relaxed text-foreground/80 normal-case font-sans">
          {module.keyTeaching}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Callout icon={MessageQuestionIcon} label="Reflect" text={module.reflectionPreview} />
          <Callout icon={NoteIcon} label="Declaration" text={module.declaration} />
          <Callout icon={CheckmarkCircle02Icon} label="Action Step" text={module.actionStep} />
          <Callout icon={WrenchIcon} label={module.tool} text={module.toolDescription} />
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground normal-case font-sans">
          Continue this work in your Course Blueprint Workbook.
        </p>
      </CardContent>
    </Card>
  )
}

interface CalloutProps {
  icon: typeof MessageQuestionIcon
  label: string
  text: string
}

function Callout({ icon, label, text }: CalloutProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-[var(--fire-red)]/5 p-4 ring-1 ring-[var(--fire-red)]/10">
      <div className="flex items-center gap-1.5">
        <HugeiconsIcon icon={icon} className="size-4 shrink-0 text-[var(--fire-red)]" />
        <span className="font-heading text-xs font-semibold tracking-wide text-foreground normal-case">
          {label}
        </span>
      </div>
      <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground normal-case font-sans">
        {text}
      </p>
    </div>
  )
}
