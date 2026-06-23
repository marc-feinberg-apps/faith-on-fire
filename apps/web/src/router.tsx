import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
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
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
