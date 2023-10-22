import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`
}

export const getChainId = (
  isConnected: boolean,
  supported?: boolean,
  chainId?: number
) => {
  return isConnected && supported ? chainId : 1
}

// Returns the name of the correct supabase table depending on the chainId
export const getSpamTokensTableName = (chainId: string) => {
  let tableToFetchFrom = "ethereum_spam_tokens"

  if (chainId === "42161") {
    tableToFetchFrom = "arbitrum_spam_tokens"
  }

  return tableToFetchFrom
}
