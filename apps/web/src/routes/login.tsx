import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from "zod"

import { LoginForm } from "@/components/login-form"

function sanitizeRedirect(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return undefined
  }
  return value
}

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
    error: z.string().optional(),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ href: sanitizeRedirect(search.redirect) ?? "/account" })
    }
  },
  head: () => ({
    meta: [
      { title: "Log In | Faith on Fire" },
      {
        name: "description",
        content: "Sign in to your Faith on Fire course or mastermind account.",
      },
    ],
  }),
  component: LoginPage,
})

function LoginPage() {
  const search = Route.useSearch()
  const redirectTo = sanitizeRedirect(search.redirect)

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto max-w-md px-6">
        <div className="mb-8 flex flex-col gap-3 text-center">
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[var(--fire-red)]">
            Welcome Back
          </span>
          <h1 className="text-4xl leading-[1.1] text-foreground">Log In to Faith on Fire</h1>
          <p className="text-base leading-relaxed text-muted-foreground normal-case font-sans">
            Use the email and password from your course or mastermind welcome email.
          </p>
        </div>

        {search.error ? (
          <p className="mb-4 text-center text-sm text-destructive">
            Something went wrong. Please try again.
          </p>
        ) : null}

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          <LoginForm redirect={redirectTo} />
        </div>
      </div>
    </section>
  )
}
