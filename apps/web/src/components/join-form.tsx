import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FireIcon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
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
import { focusAreas, joinFormSchema } from "@/lib/join-form"
import { submitJoinRequest } from "@/server/join"
import type { JoinFormValues } from "@/lib/join-form"

type FormErrors = Partial<Record<keyof JoinFormValues, string>>

const initialValues: JoinFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  believing: "",
  focusArea: "",
}

export function JoinForm() {
  const [values, setValues] = useState<JoinFormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update<TKey extends keyof JoinFormValues>(key: TKey, value: JoinFormValues[TKey]) {
    setValues((prev: JoinFormValues) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = joinFormSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof JoinFormValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitError("")
    setIsSubmitting(true)

    try {
      await submitJoinRequest({ data: result.data })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't send your request. Please email support@faithonfire.world.",
      )
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
        <h3 className="text-2xl">You're in, brother.</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          Your Faith on Fire journey starts now. Keep an eye on your inbox — we'll reach out with
          next steps for the brotherhood within 24 hours.
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
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="believing">What are you believing God for in this season?</Label>
        <Textarea
          id="believing"
          rows={4}
          value={values.believing}
          onChange={(e) => update("believing", e.target.value)}
          aria-invalid={!!errors.believing}
        />
        {errors.believing ? <p className="text-xs text-destructive">{errors.believing}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="focusArea">Which area do you need most right now?</Label>
        <Select
          value={values.focusArea}
          onValueChange={(value) => update("focusArea", value)}
        >
          <SelectTrigger id="focusArea" className="w-full" aria-invalid={!!errors.focusArea}>
            <SelectValue placeholder="Select an area" />
          </SelectTrigger>
          <SelectContent>
            {focusAreas.map((area) => (
              <SelectItem key={area.value} value={area.value}>
                {area.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.focusArea ? <p className="text-xs text-destructive">{errors.focusArea}</p> : null}
      </div>

      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="gradient-fire mt-2 gap-2 text-white"
        disabled={isSubmitting}
      >
        <HugeiconsIcon icon={FireIcon} className="size-4" />
        {isSubmitting ? "Sending..." : "Start My Faith on Fire Journey"}
      </Button>
    </form>
  )
}
