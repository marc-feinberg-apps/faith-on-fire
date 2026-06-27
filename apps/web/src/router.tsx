import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { RouteError } from "@/components/route-error"
import type { AuthContext } from "@/lib/auth-context"
import type { AccessContext } from "@/lib/access-context"

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      auth: undefined as unknown as AuthContext,
      access: undefined as unknown as AccessContext,
    },

    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    // Every route falls back to the friendly error screen unless it sets its own.
    defaultErrorComponent: RouteError,
    // Wait a beat before showing pending UI so fast loads don't flash a skeleton,
    // and once shown keep it up long enough to avoid a jarring flicker.
    defaultPendingMs: 200,
    defaultPendingMinMs: 400,
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
