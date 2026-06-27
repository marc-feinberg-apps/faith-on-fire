import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { contactTopics, contactFormSchema } from "@/lib/contact-form"
import { submitContactRequest } from "@/server/contact"
import type { ContactFormValues } from "@/lib/contact-form"

type FormErrors = Partial<Record<keyof ContactFormValues, string>>

const initialValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  topic: "",
  message: "",
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update<TKey extends keyof ContactFormValues>(key: TKey, value: ContactFormValues[TKey]) {
    setValues((prev: ContactFormValues) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = contactFormSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitError("")
    setIsSubmitting(true)

    try {
      await submitContactRequest({ data: result.data })
      setSubmitted(true)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't send your message. Please email support@faithonfire.world."
      setSubmitError(message)
      toast.error("Your message didn't send.", { description: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-10 text-center ring-1 ring-foreground/10">
        <span className="gradient-fire flex size-14 items-center justify-center rounded-full text-white">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-7" />
        </span>
        <h3 className="text-2xl">Message received, brother.</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          Thanks for reaching out. We've got your message and will get back to you at the email you
          provided within 24-48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName ? <p className="text-xs text-destructive">{errors.firstName}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName ? <p className="text-xs text-destructive">{errors.lastName}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="topic">What's this about?</Label>
          <Select value={values.topic} onValueChange={(value) => update("topic", value)}>
            <SelectTrigger id="topic" className="w-full" aria-invalid={!!errors.topic}>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {contactTopics.map((topic) => (
                <SelectItem key={topic.value} value={topic.value}>
                  {topic.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.topic ? <p className="text-xs text-destructive">{errors.topic}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
        />
        {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
      </div>

      {submitError ? (
        <p role="alert" aria-live="polite" className="text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="gradient-fire mt-2 gap-2 text-white"
        loading={isSubmitting}
      >
        {isSubmitting ? null : <HugeiconsIcon icon={Mail01Icon} className="size-4" />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
