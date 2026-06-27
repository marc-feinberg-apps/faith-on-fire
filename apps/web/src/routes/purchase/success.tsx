import { createFileRoute, Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Alert02Icon } from "@hugeicons/core-free-icons"
import { z } from "zod"

import { getCheckoutSession } from "@/server/checkout"
import { productLabels, products } from "@/lib/checkout-form"

export const Route = createFileRoute("/purchase/success")({
  validateSearch: z.object({
    session_id: z.string().optional(),
    product: z.enum(products).optional(),
  }),
  loaderDeps: ({ search }) => ({ sessionId: search.session_id }),
  loader: async ({ deps }) => {
    if (!deps.sessionId) return { ok: false, email: null }
    return getCheckoutSession({ data: { sessionId: deps.sessionId } })
  },
  head: () => ({
    meta: [{ title: "Purchase Confirmed | Faith on Fire" }],
  }),
  component: PurchaseSuccessPage,
})

function PurchaseSuccessPage() {
  const { ok, email } = Route.useLoaderData()
  const { product } = Route.useSearch()
  const productLabel = product ? productLabels[product] : "Faith on Fire"

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative z-10 mx-auto max-w-md px-6">
        <div className="rounded-3xl bg-white p-7 text-center shadow-xl shadow-foreground/5 ring-1 ring-foreground/10 sm:p-10">
          {ok ? (
            <div className="flex flex-col items-center gap-4">
              <span className="gradient-fire flex size-14 items-center justify-center rounded-full text-white">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-7" />
              </span>
              <h1 className="text-3xl leading-[1.1] text-foreground">You're in!</h1>
              <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                Thanks for joining {productLabel}. Check {email ?? "your email"} for your login
                details — they'll arrive within a few minutes.
              </p>
              <Link
                to="/login"
                className="gradient-fire mt-2 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <HugeiconsIcon icon={Alert02Icon} className="size-7" />
              </span>
              <h1 className="text-3xl leading-[1.1] text-foreground">We couldn't verify that</h1>
              <p className="text-sm leading-relaxed text-muted-foreground normal-case font-sans">
                This page is only valid right after a completed purchase. If you just paid and
                landed here by mistake, check your email for confirmation, or reach out to{" "}
                support@faithonfire.world.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
