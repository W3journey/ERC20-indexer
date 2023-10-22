import { addressSchema } from "@/schemas/addressSchema"
import { chainIdSchema } from "@/schemas/chainIdSchema"
import { z } from "zod"

const spamTokenSchema = z.object({
  contractAddress: addressSchema,
  name: z.string().optional(),
  symbol: z.string().optional(),
  possible_spam: z.boolean(),
})

export const reportSpamTokensSchema = z.object({
  chainId: z.string(chainIdSchema),
  tokens: z.array(spamTokenSchema),
})
