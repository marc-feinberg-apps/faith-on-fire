import { z } from "zod"

export const focusAreas = [
  { value: "return", label: "Return" },
  { value: "restore", label: "Restore" },
  { value: "reignite", label: "Reignite" },
  { value: "brotherhood", label: "Brotherhood" },
] as const

export const joinFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  phone: z.string().trim().optional(),
  believing: z
    .string()
    .trim()
    .min(1, "Tell us what you're believing God for this season."),
  focusArea: z.enum(focusAreas.map((f) => f.value) as [string, ...string[]], {
    message: "Choose the area you need most right now.",
  }),
})

export type JoinFormValues = z.infer<typeof joinFormSchema>

export function getFocusAreaLabel(value: JoinFormValues["focusArea"]) {
  return focusAreas.find((area) => area.value === value)?.label ?? value
}
