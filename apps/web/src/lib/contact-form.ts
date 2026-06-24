import { z } from "zod"

export const contactTopics = [
  { value: "general", label: "General Question" },
  { value: "access", label: "Course / E-book Access" },
  { value: "mastermind", label: "Mastermind / Membership" },
  { value: "billing", label: "Billing & Payments" },
  { value: "prayer", label: "Prayer Request" },
  { value: "other", label: "Something Else" },
] as const

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  topic: z.enum(contactTopics.map((t) => t.value) as [string, ...string[]], {
    message: "Choose what your message is about.",
  }),
  message: z
    .string()
    .trim()
    .min(1, "Let us know how we can help.")
    .max(5000, "Please keep your message under 5000 characters."),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export function getContactTopicLabel(value: ContactFormValues["topic"]) {
  return contactTopics.find((topic) => topic.value === value)?.label ?? value
}
