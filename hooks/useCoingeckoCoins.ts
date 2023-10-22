import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { coinsResponseSchema } from "@/schemas/coingeckoSchema"

const fetchCoin = async (chainName: string) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${chainName}`
  )

  const validatedResponse = coinsResponseSchema.parse(data)
  return validatedResponse
}

export const useCoingeckoCoins = (chainId?: number) => {
  const enable = !!chainId
  const chainName = enable && chainId === 1 ? "ethereum" : "arbitrum"

  return useQuery({
    queryKey: ["coin", chainName],
    queryFn: () => fetchCoin(chainName),
    enabled: enable,
    staleTime: 60,
    keepPreviousData: true,
  })
}
