import { createServerFn } from "@tanstack/react-start"

import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin"
import type { AccessContext } from "@/lib/access-context"

const EBOOK_BUCKET = "member-files"
const EBOOK_PATH = "faith-on-fire-ebook.pdf"

const NO_ACCESS: AccessContext = {
  hasCourse: false,
  hasEbook: false,
  hasMastermind: false,
}

// Reads the current user's active purchases via the SSR (anon) client, which is
// bound by RLS to `auth.uid() = user_id`, so a user can only ever see their own
// entitlements. Returns all-false when Supabase isn't configured or the request
// is unauthenticated. Shared by the route context and the guarded area fns below.
async function readAccess(): Promise<AccessContext> {
  if (!isSupabaseConfigured()) return NO_ACCESS

  const supabase = getSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return NO_ACCESS

  const { data } = await supabase
    .from("purchases")
    .select("product")
    .eq("status", "active")

  const products = new Set((data ?? []).map((row) => row.product))
  // Tiered: Mastermind unlocks the Course, and either the Course or Mastermind
  // unlocks the ebook (the ebook is a subset of the course content).
  const hasMastermind = products.has("mastermind")
  const hasCourse = products.has("course") || hasMastermind
  return {
    hasCourse,
    hasEbook: hasCourse,
    hasMastermind,
  }
}

export const getMyAccess = createServerFn({ method: "GET" }).handler(readAccess)

// Sensitive member-area config is fetched through these guarded server fns rather
// than embedded in the client bundle. Each re-verifies entitlement server-side
// (defense in depth) before returning any URL, so a non-owner can never receive
// the Calendly/Zoom links even if a client-side route guard is bypassed.
export const getCourseArea = createServerFn({ method: "GET" }).handler(async () => {
  const access = await readAccess()
  if (!access.hasCourse) return null
  return { calendlyUrl: process.env.CALENDLY_COACHING_URL ?? "" }
})

export const getMastermindArea = createServerFn({ method: "GET" }).handler(async () => {
  const access = await readAccess()
  if (!access.hasMastermind) return null
  return {
    calendlyUrl: process.env.CALENDLY_COACHING_URL ?? "",
    zoomUrl: process.env.MASTERMIND_ZOOM_URL ?? "",
  }
})

// Mints a short-lived signed URL for the ebook in the private `member-files`
// bucket. Entitlement is checked server-side first, so the file (which is never
// public) can only be reached by a member with course/mastermind access, and the
// link expires in minutes even if shared.
export const getEbookDownloadUrl = createServerFn({ method: "GET" }).handler(async () => {
  const access = await readAccess()
  if (!access.hasEbook || !isSupabaseAdminConfigured()) return null

  const admin = getSupabaseAdminClient()
  const { data } = await admin.storage
    .from(EBOOK_BUCKET)
    .createSignedUrl(EBOOK_PATH, 60 * 5)

  return { url: data?.signedUrl ?? null }
})
