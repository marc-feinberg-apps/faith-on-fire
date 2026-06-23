import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { requestPasswordResetSchema } from "@/lib/auth-form"
import { requestPasswordReset } from "@/server/auth"

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Reset Password | Faith on Fire" }],
  }),
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const requestResetFn = useServerFn(requestPasswordReset)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = requestPasswordResetSchema.safeParse({ email })

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Enter a valid email address.")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      await requestResetFn({ data: result.data })
      setSent(true)
    } catch {
      setError("We couldn't send a reset link. Please try again.")
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
            Reset Password
          </span>
          <h1 className="text-4xl leading-[1.1] text-foreground">Forgot your password?</h1>
          <p className="text-base leading-relaxed text-muted-foreground normal-case font-sans">
            Enter your email and we'll send you a link to set a new password.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          {sent ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="gradient-fire flex size-14 items-center justify-center rounded-full text-white">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-7" />
              </span>
              <h3 className="text-2xl">Check your email</h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                If an account exists for {email}, a password reset link is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  placeholder="you@example.com"
                />
                {error ? <p className="text-xs text-destructive">{error}</p> : null}
              </div>

              <Button
                type="submit"
                size="lg"
                className="gradient-fire gap-2 text-white"
                disabled={isSubmitting}
              >
                <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
