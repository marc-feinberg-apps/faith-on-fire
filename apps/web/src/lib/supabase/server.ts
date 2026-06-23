import { createServerClient } from "@supabase/ssr"
import type { CookieOptions } from "@supabase/ssr"
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server"

function serializeCookie(name: string, value: string, options?: CookieOptions) {
  const parts = [`${name}=${value}`, "Path=/", "HttpOnly", "SameSite=Lax"]
  if (process.env.NODE_ENV === "production") parts.push("Secure")
  if (options?.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`)
  return parts.join("; ")
}

export function isSupabaseConfigured() {
  return !!process.env.VITE_SUPABASE_URL && !!process.env.VITE_SUPABASE_ANON_KEY
}

export function getSupabaseServerClient() {
  return createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const header = getRequestHeader("cookie") ?? ""
          return header
            .split(/;\s*/)
            .filter(Boolean)
            .map((pair) => {
              const eq = pair.indexOf("=")
              return { name: pair.slice(0, eq), value: pair.slice(eq + 1) }
            })
        },
        setAll(cookiesToSet) {
          // setResponseHeader overwrites for a single string, so the full set
          // of Set-Cookie values must be passed together as an array.
          setResponseHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) => serializeCookie(name, value, options)),
          )
        },
      },
    },
  )
}
