"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useNetwork } from "wagmi"

import PaginationBar from "@/components/pagination-bar"
import TokensOverview from "@/components/tokens-overview"

import useTokensForOwner from "@/hooks/useTokensForOwner"
import { getChainId } from "@/lib/utils"

export default function PortfolioPage() {
  const [page, setPage] = useState<string>()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const chainId = getChainId(isConnected, !chain?.unsupported, chain?.id)

  const {
    data: tokensForOwner,
    isError,
    isLoading,
    isFetching,
    isPreviousData,
  } = useTokensForOwner(address, page, chainId)

  return (
    <main className="container flex flex-col items-center justify-between px-6 py-12 mx-auto sm:px-24">
      <h1 className="py-3 text-3xl font-semibold tracking-tight transition-colors">
        Tokens
      </h1>
      {!isConnected || chain?.unsupported ? (
        <div className="flex flex-col justify-center h-96">
          <ConnectButton />
        </div>
      ) : (
        <>
          <TokensOverview
            tokensForOwner={tokensForOwner?.tokens}
            isTokensLoading={isLoading}
            isFetching={isFetching}
          />
          <PaginationBar
            className="pt-6"
            page={page}
            fetchingState={isFetching}
            isPreviousPage={isPreviousData}
            onChange={setPage}
            nextPageKey={tokensForOwner?.pageKey}
          />
        </>
      )}
    </main>
  )
}
