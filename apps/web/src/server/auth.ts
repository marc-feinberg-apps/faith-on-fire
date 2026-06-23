import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { z } from "zod"

import {
  changePasswordSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "@/lib/auth-form"
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server"

export const signInWithPassword = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    if (!isSupabaseConfigured()) throw new Error("Sign-in is not configured yet.")
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw new Error("Invalid email or password.")
    return { ok: true }
  })

export const requestPasswordReset = createServerFn({ method: "POST" })
  .validator(requestPasswordResetSchema)
  .handler(async ({ data }) => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient()
      const origin = new URL(getRequest().url).origin
      // Always return { ok: true } below regardless of outcome here — never
      // reveal whether an email address has an account.
      await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${origin}/update-password`,
      })
    }

    return { ok: true }
  })

export const exchangeRecoveryCode = createServerFn({ method: "POST" })
  .validator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    if (!isSupabaseConfigured()) return { ok: false }
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(data.code)
    return { ok: !error }
  })

export const updatePassword = createServerFn({ method: "POST" })
  .validator(resetPasswordSchema)
  .handler(async ({ data }) => {
    if (!isSupabaseConfigured()) throw new Error("Sign-in is not configured yet.")
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) throw new Error("We couldn't update your password. Request a new reset link.")
    return { ok: true }
  })

export const changePassword = createServerFn({ method: "POST" })
  .validator(changePasswordSchema)
  .handler(async ({ data }) => {
    if (!isSupabaseConfigured()) throw new Error("Sign-in is not configured yet.")
    const supabase = getSupabaseServerClient()

    const { data: userData } = await supabase.auth.getUser()
    const email = userData.user?.email
    if (!email) throw new Error("You need to be signed in to change your password.")

    // Verify the current password by re-authenticating before allowing a change.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: data.currentPassword,
    })
    if (signInError) throw new Error("Your current password is incorrect.")

    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) throw new Error("We couldn't update your password. Please try again.")
    return { ok: true }
  })

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  if (!isSupabaseConfigured()) return { user: null }
  const supabase = getSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user?.email) return { user: null }
  return { user: { id: data.user.id, email: data.user.email } }
})

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  if (!isSupabaseConfigured()) return { ok: true }
  const supabase = getSupabaseServerClient()
  await supabase.auth.signOut()
  return { ok: true }
})
