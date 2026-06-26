import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin"
import type { AccessContext } from "@/lib/access-context"

const EBOOK_BUCKET = "member-files"
const EBOOK_PATH = "faith-on-fire-ebook.pdf"

const WORKBOOK_BUCKET = "member-files"
const WORKBOOK_PATH = "course-blueprint/workbook.pdf"

// Course videos live in the same private `member-files` bucket as the ebook,
// under `course-blueprint/course_<n>.mp4` (1-based). They're never public — each
// playback URL is minted on demand by `getCourseVideoUrl` after re-checking both
// entitlement and that the module has actually been unlocked for the user.
const COURSE_VIDEO_BUCKET = "member-files"
const COURSE_VIDEO_PREFIX = "course-blueprint/course_"
const TOTAL_MODULES = 11
// Calendar-day boundary for the "one new module per day" drip. Using a fixed,
// US-Eastern day means the unlock resets at the same wall-clock moment for every
// member regardless of where they (or the server) are.
const UNLOCK_TZ = "America/New_York"

// `YYYY-MM-DD` for a given instant in `UNLOCK_TZ`. Two unlocks share a "day" when
// their date keys are equal, which is how the daily gate is enforced.
function dateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: UNLOCK_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

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

// Mints a short-lived signed URL for the workbook PDF in the private bucket.
// Only reachable by members with an active course/mastermind purchase.
export const getWorkbookDownloadUrl = createServerFn({ method: "GET" }).handler(async () => {
  const access = await readAccess()
  if (!access.hasCourse || !isSupabaseAdminConfigured()) return null

  const admin = getSupabaseAdminClient()
  const { data } = await admin.storage
    .from(WORKBOOK_BUCKET)
    .createSignedUrl(WORKBOOK_PATH, 60 * 5)

  return { url: data?.signedUrl ?? null }
})

// ── Course library (drip-paced video unlocks) ───────────────────────────────

export interface CourseLibraryState {
  unlocked: number[] // module numbers the user has unlocked (rewatchable anytime)
  nextModule: number | null // the one module they may unlock next, or null when done
  canUnlockToday: boolean // false once they've already unlocked a module today
}

// Reads the current user's unlock rows (RLS-bound to their own user_id) and
// derives the drip state. Unlocks are strictly sequential, so the next module is
// always `max(unlocked) + 1`; `canUnlockToday` is false if the latest unlock
// happened on today's calendar day in UNLOCK_TZ.
async function readCourseLibrary(): Promise<CourseLibraryState> {
  const empty: CourseLibraryState = { unlocked: [], nextModule: 1, canUnlockToday: true }
  if (!isSupabaseConfigured()) return empty

  const supabase = getSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return empty

  const { data } = await supabase
    .from("course_unlocks")
    .select("module_number, unlocked_at")
    .order("module_number", { ascending: true })

  const rows = data ?? []
  const unlocked = rows.map((row) => row.module_number)
  const highest = unlocked.length ? Math.max(...unlocked) : 0
  const nextModule = highest >= TOTAL_MODULES ? null : highest + 1

  const today = dateKey(new Date())
  const unlockedToday = rows.some((row) => dateKey(new Date(row.unlocked_at)) === today)

  return { unlocked, nextModule, canUnlockToday: !unlockedToday }
}

export const getCourseLibrary = createServerFn({ method: "GET" }).handler(async () => {
  const access = await readAccess()
  if (!access.hasCourse) return null
  return readCourseLibrary()
})

// Unlocks the next sequential module for the current user, enforcing the
// one-per-calendar-day rule. All checks are recomputed server-side (the client
// is never trusted), and the `unique (user_id, module_number)` constraint is the
// final guard against a double-unlock race. Returns a discriminated result so
// the UI can show the right message.
export const unlockNextModule = createServerFn({ method: "POST" }).handler(async () => {
  const access = await readAccess()
  if (!access.hasCourse || !isSupabaseAdminConfigured()) {
    return { ok: false as const, reason: "no-access" as const }
  }

  const supabase = getSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return { ok: false as const, reason: "no-access" as const }

  const state = await readCourseLibrary()
  if (state.nextModule === null) return { ok: false as const, reason: "all-unlocked" as const }
  if (!state.canUnlockToday) return { ok: false as const, reason: "daily-limit" as const }

  const admin = getSupabaseAdminClient()
  const { error } = await admin
    .from("course_unlocks")
    .insert({ user_id: userData.user.id, module_number: state.nextModule })

  if (error) return { ok: false as const, reason: "failed" as const }
  return { ok: true as const, module: state.nextModule }
})

// Mints a short-lived signed URL for an unlocked module's video. Re-verifies
// entitlement AND that the requested module is in the user's unlocked set, so a
// locked (or not-yet-paced) video can never be fetched even if the UI is
// bypassed. TTL is long enough to watch the whole lesson without expiring.
export const getCourseVideoUrl = createServerFn({ method: "POST" })
  .validator(z.object({ module: z.number().int().min(1).max(TOTAL_MODULES) }))
  .handler(async ({ data }) => {
    const access = await readAccess()
    if (!access.hasCourse || !isSupabaseAdminConfigured()) return { url: null }

    const state = await readCourseLibrary()
    if (!state.unlocked.includes(data.module)) return { url: null }

    const admin = getSupabaseAdminClient()
    const { data: signed } = await admin.storage
      .from(COURSE_VIDEO_BUCKET)
      .createSignedUrl(`${COURSE_VIDEO_PREFIX}${data.module}.mp4`, 60 * 60 * 2)

    return { url: signed?.signedUrl ?? null }
  })
