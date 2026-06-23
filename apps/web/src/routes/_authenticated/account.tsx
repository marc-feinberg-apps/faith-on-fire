import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useServerFn } from "@tanstack/react-start"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { signOut } from "@/server/auth"
import { ChangePasswordForm } from "@/components/change-password-form"

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [{ title: "My Account | Faith on Fire" }],
  }),
  component: AccountPage,
})

function AccountPage() {
  const { auth } = Route.useRouteContext()
  const signOutFn = useServerFn(signOut)
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    await signOutFn()
    await navigate({ to: "/" })
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-6 px-6">
        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            My Account
          </span>
          <h1 className="mt-3 text-3xl leading-[1.1] text-foreground">You're signed in.</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            {auth.user?.email}
          </p>

          <Button
            variant="outline"
            className="mt-8 gap-2"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            <HugeiconsIcon icon={Logout01Icon} className="size-4" />
            {isSigningOut ? "Logging out..." : "Log Out"}
          </Button>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            Settings
          </span>
          <h2 className="mt-3 text-2xl leading-[1.1] text-foreground">Change your password</h2>
          <p className="mt-3 mb-7 text-sm leading-relaxed text-muted-foreground normal-case font-sans">
            Enter your current password, then choose a new one.
          </p>
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  )
}
