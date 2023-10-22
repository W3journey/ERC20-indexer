import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { tvlResponseSchema } from "@/schemas/defilamaSchema"

const fetchTvl = async () => {
  const { data } = await axios.get(`https://api.llama.fi/v2/chains`)

  const validatedTvlResponse = tvlResponseSchema.parse(data)
  return validatedTvlResponse
}

export const useTvl = () => {
  return useQuery({
    queryKey: ["tvl"],
    queryFn: () => fetchTvl(),
    staleTime: 60,
  })
}
