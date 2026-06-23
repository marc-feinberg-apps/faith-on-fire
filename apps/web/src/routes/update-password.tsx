import { useState } from "react"
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockIcon, AlertCircleIcon } from "@hugeicons/core-free-icons"
import { z } from "zod"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { resetPasswordSchema } from "@/lib/auth-form"
import { exchangeRecoveryCode, updatePassword } from "@/server/auth"
import type { ResetPasswordValues } from "@/lib/auth-form"

type FormErrors = Partial<Record<keyof ResetPasswordValues, string>>

const EMPTY: ResetPasswordValues = { password: "", confirmPassword: "" }

export const Route = createFileRoute("/update-password")({
  validateSearch: z.object({
    code: z.string().optional(),
    // Supabase redirects here with these params when a link is expired/invalid.
    error: z.string().optional(),
    error_description: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    // Expired or otherwise rejected link — show a message instead of bouncing.
    if (search.error) return { ready: false }
    if (!search.code) {
      throw redirect({ href: "/reset-password" })
    }

    const { ok } = await exchangeRecoveryCode({ data: { code: search.code } })
    return { ready: ok }
  },
  head: () => ({
    meta: [{ title: "Set New Password | Faith on Fire" }],
  }),
  component: UpdatePasswordPage,
})

function UpdatePasswordPage() {
  const { ready } = Route.useRouteContext()
  const updatePasswordFn = useServerFn(updatePassword)
  const navigate = useNavigate()
  const [values, setValues] = useState<ResetPasswordValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<TKey extends keyof ResetPasswordValues>(
    key: TKey,
    value: ResetPasswordValues[TKey],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = resetPasswordSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ResetPasswordValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitError("")
    setIsSubmitting(true)

    try {
      await updatePasswordFn({ data: result.data })
      await navigate({ to: "/login", search: { reset: "success" } })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "We couldn't update your password.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto max-w-md px-6">
        <div className="mb-8 flex flex-col gap-3 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            Set New Password
          </span>
          <h1 className="text-4xl leading-[1.1] text-foreground">Choose a new password</h1>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          {ready ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

              <Button
                type="submit"
                size="lg"
                className="gradient-fire gap-2 text-white"
                disabled={isSubmitting}
              >
                <HugeiconsIcon icon={LockIcon} className="size-4" />
                {isSubmitting ? "Saving..." : "Save Password"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <HugeiconsIcon icon={AlertCircleIcon} className="size-7" />
              </span>
              <h3 className="text-2xl">This link has expired</h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                Your password reset link is invalid or has already been used. Request a fresh one and
                we'll send it right over.
              </p>
              <Button asChild size="lg" className="gradient-fire gap-2 text-white">
                <Link to="/reset-password">Request a new link</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
