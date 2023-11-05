import { getNftsForOwner } from "@/app/actions/getNftsForOwner"
import { nftsForOwnerSchema } from "@/schemas/nftsForOwnerSchema"
import { useQuery } from "@tanstack/react-query"

export default function useNftsForOwner(
  address?: string,
  chainId?: number,
  pageKey?: string | null
) {
  const addressExist = !!address
  const chainIdExist = !!chainId
  const enableQuery = chainIdExist && addressExist

  return useQuery({
    queryKey: ["nft", address, chainId, pageKey],
    queryFn: async () => {
      const data = await getNftsForOwner(address!, chainId!, pageKey)
      const validatedData = nftsForOwnerSchema.parse(data)

      return validatedData
    },
    enabled: enableQuery,
    staleTime: 60,
    keepPreviousData: true,
    retry: 2,
  })
}
