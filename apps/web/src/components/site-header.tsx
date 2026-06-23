import { useState } from "react"
import { Link, useRouteContext } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, UserIcon } from "@hugeicons/core-free-icons"
import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { navLinks } from "@/data/site"
import { CtaButton } from "@/components/cta-button"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { auth } = useRouteContext({ from: "__root__" })

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/brand/faith-on-fire-logo-transparent.png"
            alt="Faith on Fire"
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-heading text-sm font-medium tracking-wide transition-colors hover:text-[var(--fire-red)]"
              activeProps={{ className: "text-[var(--fire-red)]" }}
              inactiveProps={{ className: "text-foreground/80" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {auth.isAuthenticated ? (
            <Link
              to="/account"
              className="flex items-center gap-2 font-heading text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--fire-red)]"
            >
              <HugeiconsIcon icon={UserIcon} className="size-4" />
              Account
            </Link>
          ) : (
            <Link
              to="/login"
              className="font-heading text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--fire-red)]"
            >
              Log In
            </Link>
          )}
          <CtaButton href="/join" size="default">
            Join the Brotherhood
          </CtaButton>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <HugeiconsIcon icon={Menu01Icon} className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Faith on Fire</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-heading text-base font-medium transition-colors hover:bg-muted hover:text-[var(--fire-red)]"
                  activeProps={{ className: "text-[var(--fire-red)]" }}
                  inactiveProps={{ className: "text-foreground/85" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={auth.isAuthenticated ? "/account" : "/login"}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-heading text-base font-medium transition-colors hover:bg-muted hover:text-[var(--fire-red)]"
                activeProps={{ className: "text-[var(--fire-red)]" }}
                inactiveProps={{ className: "text-foreground/85" }}
              >
                {auth.isAuthenticated ? "Account" : "Log In"}
              </Link>
            </nav>
            <div className="mt-2 px-4">
              <CtaButton href="/join" className="w-full">
                Join the Brotherhood
              </CtaButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
