import { useState } from "react"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockIcon } from "@hugeicons/core-free-icons"
import { z } from "zod"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { resetPasswordSchema } from "@/lib/auth-form"
import { exchangeRecoveryCode, updatePassword } from "@/server/auth"

export const Route = createFileRoute("/update-password")({
  validateSearch: z.object({
    code: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    if (!search.code) {
      throw redirect({ href: "/reset-password" })
    }

    const { ok } = await exchangeRecoveryCode({ data: { code: search.code } })
    if (!ok) {
      throw redirect({ href: "/reset-password" })
    }
  },
  head: () => ({
    meta: [{ title: "Set New Password | Faith on Fire" }],
  }),
  component: UpdatePasswordPage,
})

function UpdatePasswordPage() {
  const updatePasswordFn = useServerFn(updatePassword)
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = resetPasswordSchema.safeParse({ password })

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Enter a valid password.")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      await updatePasswordFn({ data: result.data })
      await navigate({ to: "/account" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't update your password.")
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error}
              />
              {error ? <p className="text-xs text-destructive">{error}</p> : null}
            </div>

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
        </div>
      </div>
    </section>
  )
}
