import { useState } from "react"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockKeyIcon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { changePasswordSchema } from "@/lib/auth-form"
import { changePassword } from "@/server/auth"
import type { ChangePasswordValues } from "@/lib/auth-form"

type FormErrors = Partial<Record<keyof ChangePasswordValues, string>>

const EMPTY: ChangePasswordValues = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
}

export function ChangePasswordForm() {
  const changePasswordFn = useServerFn(changePassword)
  const [values, setValues] = useState<ChangePasswordValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<TKey extends keyof ChangePasswordValues>(
    key: TKey,
    value: ChangePasswordValues[TKey],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (success) setSuccess(false)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = changePasswordSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ChangePasswordValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitError("")
    setSuccess(false)
    setIsSubmitting(true)

    try {
      await changePasswordFn({ data: result.data })
      setValues(EMPTY)
      setSuccess(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "We couldn't update your password.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="currentPassword">Current password</Label>
        <Input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          value={values.currentPassword}
          onChange={(e) => update("currentPassword", e.target.value)}
          aria-invalid={!!errors.currentPassword}
        />
        {errors.currentPassword ? (
          <p className="text-xs text-destructive">{errors.currentPassword}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          aria-invalid={!!errors.password}
        />
        {errors.password ? (
          <p className="text-xs text-destructive">{errors.password}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword ? (
          <p className="text-xs text-destructive">{errors.confirmPassword}</p>
        ) : null}
      </div>

      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
      {success ? (
        <p className="flex items-center gap-2 text-sm font-medium text-[var(--fire-red)]">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" />
          Password updated.
        </p>
      ) : null}

      <Button
        type="submit"
        className="gradient-fire gap-2 self-start text-white"
        disabled={isSubmitting}
      >
        <HugeiconsIcon icon={LockKeyIcon} className="size-4" />
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </form>
  )
}
