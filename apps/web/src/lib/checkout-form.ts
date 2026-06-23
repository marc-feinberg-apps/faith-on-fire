import { z } from "zod"

export const products = ["course", "mastermind"] as const
export type Product = (typeof products)[number]

export const checkoutSchema = z.object({
  product: z.enum(products),
})

export const productLabels: Record<Product, string> = {
  course: "Faith on Fire Course",
  mastermind: "Faith on Fire Mastermind",
}
