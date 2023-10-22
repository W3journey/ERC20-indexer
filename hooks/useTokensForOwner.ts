import { useSearchParams } from "next/navigation"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { tokensForOwnerResultSchema } from "@/schemas/tokensForOwnerSchema"

const fetchTokensForOwner = async (params: URLSearchParams) => {
  const { data } = await axios.get(`/api/getTokensForOwner/?` + params)
  const validatedResponse = tokensForOwnerResultSchema.parse(data)

  return validatedResponse
}

export default function useTokensForOwner(
  address?: `0x${string}` | string | null | undefined,
  page?: string,
  chainId?: number
) {
  const searchParams = useSearchParams()

  const addressExist = !!address
  const chainIdExist = !!chainId
  const enableQuery = chainIdExist && addressExist
  const params = new URLSearchParams(searchParams)

  address && params.set("address", address)
  chainId && params.set("chainId", chainId.toString())
  page && params.set("pageKey", page)

  return useQuery({
    queryKey: ["tokens", address, chainId, page],
    queryFn: () => fetchTokensForOwner(params),
    enabled: enableQuery,
    staleTime: 60,
    keepPreviousData: true,
    retry: 2,
  })
}
