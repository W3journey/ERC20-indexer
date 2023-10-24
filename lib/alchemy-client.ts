import { Alchemy, Network } from "alchemy-sdk"

const getAlchemySettings = (chainId: string) => {
  if (chainId === "42161") {
    return {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY,
      network: Network.ARB_MAINNET,
    }
  } else {
    return {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY,
      network: Network.ETH_MAINNET,
    }
  }
}

export const alchemyClient = (chainId: string) => {
  return new Alchemy(getAlchemySettings(chainId))
}
