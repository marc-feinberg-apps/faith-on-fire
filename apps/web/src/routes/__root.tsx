import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router"

import appCss from "@workspace/ui/globals.css?url"
import { Toaster } from "@workspace/ui/components/sonner"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EbookPopup } from "@/components/ebook-popup"
import { RouteProgress } from "@/components/route-progress"
import { RouteError } from "@/components/route-error"
import { CtaButton } from "@/components/cta-button"
import { siteConfig } from "@/data/site"
import { getCurrentUser } from "@/server/auth"
import { getMyAccess } from "@/server/member"
import type { AuthContext } from "@/lib/auth-context"
import type { AccessContext } from "@/lib/access-context"

const defaultTitle = "Faith on Fire | A Brotherhood for Men Who Refuse to Drift"
const defaultDescription = siteConfig.tagline

export const Route = createRootRouteWithContext<{ auth: AuthContext; access: AccessContext }>()({
  beforeLoad: async () => {
    const { user } = await getCurrentUser()
    const auth: AuthContext = { isAuthenticated: !!user, user }
    const access = user
      ? await getMyAccess()
      : { hasCourse: false, hasEbook: false, hasMastermind: false }
    return { auth, access }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: defaultTitle,
      },
      {
        name: "description",
        content: defaultDescription,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: defaultTitle,
      },
      {
        property: "og:description",
        content: defaultDescription,
      },
      {
        property: "og:image",
        content: siteConfig.ogImage,
      },
      {
        property: "og:url",
        content: siteConfig.url,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: defaultTitle,
      },
      {
        name: "twitter:description",
        content: defaultDescription,
      },
      {
        name: "twitter:image",
        content: siteConfig.ogImage,
      },
      {
        name: "theme-color",
        content: "#d81d00",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "any",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <p className="font-heading text-7xl font-bold text-gradient-fire">404</p>
      <div className="space-y-2">
        <h1 className="text-3xl text-foreground">This page wandered off</h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground normal-case font-sans">
          The page you're looking for doesn't exist or has moved. Let's get you back on solid
          ground.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <CtaButton href="/" size="default">
          Back to home
        </CtaButton>
        <Link
          to="/contact"
          className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-[var(--fire-red)] hover:underline"
        >
          Contact support
        </Link>
      </div>
    </main>
  ),
  errorComponent: RouteError,
  component: RootLayout,
  shellComponent: RootDocument,
})

function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <RouteProgress />
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-foreground px-4 py-2 font-heading text-sm font-semibold text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:ring-2 focus:ring-[var(--fire-red)]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <EbookPopup />
      <Toaster />
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
