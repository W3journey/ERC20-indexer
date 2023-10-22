import { z } from "zod"

import { addressSchema } from "@/schemas/addressSchema"

export const tokenSchema = z.object({
  contractAddress: z.string(),
  rawBalance: z.string().optional(),
  balance: z.string().optional(),
  name: z.string().optional(),
  symbol: z.string().optional(),
  decimals: z.number().optional(),
  logo: z.string().optional(),
  error: z.string().optional(),
  possibleSpam: z.boolean().optional(),
})

export const tokensForOwnerResultSchema = z.object({
  tokens: z.array(tokenSchema),
  pageKey: z.string().optional(),
})
