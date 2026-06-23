import { useState } from "react"
import { useServerFn } from "@tanstack/react-start"
import { Link, useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockIcon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { loginSchema } from "@/lib/auth-form"
import { signInWithPassword } from "@/server/auth"
import type { LoginValues } from "@/lib/auth-form"

type FormErrors = Partial<Record<keyof LoginValues, string>>

export function LoginForm({ redirect }: { redirect?: string }) {
  const signInFn = useServerFn(signInWithPassword)
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<TKey extends keyof LoginValues>(key: TKey, value: LoginValues[TKey]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = loginSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginValues
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitError("")
    setIsSubmitting(true)

    try {
      await signInFn({ data: result.data })
      await navigate({ to: redirect ?? "/dashboard" })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Invalid email or password.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          placeholder="you@example.com"
        />
        {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            to="/reset-password"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-[var(--fire-red)]"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          aria-invalid={!!errors.password}
        />
        {errors.password ? <p className="text-xs text-destructive">{errors.password}</p> : null}
      </div>

      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="gradient-fire gap-2 text-white"
        disabled={isSubmitting}
      >
        <HugeiconsIcon icon={LockIcon} className="size-4" />
        {isSubmitting ? "Logging in..." : "Log In"}
      </Button>
    </form>
  )
}
