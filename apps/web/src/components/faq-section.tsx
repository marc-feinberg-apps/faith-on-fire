import { SectionHeading } from "@/components/section-heading"
import { GradientSection } from "@/components/gradient-section"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion"

export function FaqSection({
  items,
  variant = "white",
}: {
  items: ReadonlyArray<{ question: string; answer: string }>
  variant?: "white" | "cream"
}) {
  return (
    <GradientSection variant={variant}>
      <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
      <Accordion type="single" collapsible className="mx-auto mt-12 max-w-2xl">
        {items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="font-heading text-base text-foreground">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground normal-case font-sans">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </GradientSection>
  )
}
