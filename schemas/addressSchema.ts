import { z } from "zod"
import { isAddress } from "viem"

// export const addressSchema = z.object({
//   address: z.string().refine((value) => isAddress(value), {
//     message: "Invalid Ethereum address format",
//   }),
// })

export const addressSchema = z.string().refine((value) => isAddress(value), {
  message: "Invalid Ethereum address format",
})
