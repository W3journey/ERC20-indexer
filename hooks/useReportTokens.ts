import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { toast } from "sonner"

import { tokenSchema } from "@/schemas/tokensForOwnerSchema"

type mutationParams = {
  tokens: z.infer<typeof tokenSchema>[]
  chainId: number
}

interface useReportTokensProps {
  stateSetter: () => void
}

export default function useReportTokens({ stateSetter }: useReportTokensProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: mutationParams) => {
      const { tokens, chainId } = params

      const spamTokens = tokens.map((token) => {
        return {
          contractAddress: token.contractAddress,
          name: token.name,
          symbol: token.symbol,
          possible_spam: true,
        }
      })

      const { data } = await axios.post("/api/reportSpamToken", {
        tokens: spamTokens,
        chainId: chainId.toString(),
      })

      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] })
      toast.success(`${data?.length} Tokens Reported`)
      stateSetter()
    },
    onError: () => {
      toast.error("Something went wrong, please try again")
    },
  })
}
