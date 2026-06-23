import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

export type LoginValues = z.infer<typeof loginSchema>

export const requestPasswordResetSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  })

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>
