import { createFileRoute, redirect } from "@tanstack/react-router"

// The community/testimonials page was folded into the Mastermind page. Keep
// this path as a redirect so existing links and search results don't break.
export const Route = createFileRoute("/community")({
  beforeLoad: () => {
    throw redirect({ to: "/mastermind" })
  },
})
