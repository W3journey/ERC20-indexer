import { z } from "zod"

export const chainInfo = z.object({
  gecko_id: z.nullable(z.string()),
  tvl: z.number(),
  tokenSymbol: z.nullable(z.string()),
  cmcId: z.nullable(z.string()),
  name: z.string(),
  chainId: z.nullable(z.coerce.number()),
})

export const tvlResponseSchema = z.array(chainInfo)
