"use server"

import axios from "axios"

const constructBaseUrl = (chainId: number) => {
  const apiKey =
    chainId === 1
      ? process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY
      : process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_API_KEY
  const network =
    chainId === 1 ? "eth-mainnet.g.alchemy.com" : "arb-mainnet.g.alchemy.com"
  return `https://${network}/nft/v3/${apiKey}/getNFTsForOwner`
}

export const getNftsForOwner = async (
  owner: string,
  chainId: number,
  pageKey?: string | null
) => {
  const options = {
    method: "GET",
    url: constructBaseUrl(chainId),
    params: {
      owner: owner,
      withMetadata: "true",
      "excludeFilters[]": "SPAM",
      pageSize: "100",
      pageKey,
    },
    headers: { accept: "application/json" },
  }

  const { data } = await axios.request(options)

  return data
}
