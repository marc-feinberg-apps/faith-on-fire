import { createFileRoute, redirect } from "@tanstack/react-router"

// The Blueprint was renamed to the Course. Keep this path as a redirect so
// existing links and search-engine results don't break.
export const Route = createFileRoute("/blueprint")({
  beforeLoad: () => {
    throw redirect({ to: "/course" })
  },
})
