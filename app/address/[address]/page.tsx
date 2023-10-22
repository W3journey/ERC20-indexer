"use client"

import { useState } from "react"
import { useAccount, useNetwork } from "wagmi"

import PaginationBar from "@/components/pagination-bar"
import TokensOverview from "@/components/tokens-overview"

import useTokensForOwner from "@/hooks/useTokensForOwner"
import { getChainId } from "@/lib/utils"

const Page = ({ params }: { params: { address: string } }) => {
  const address = params.address
  const [page, setPage] = useState<string>()
  const { isConnected } = useAccount()
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
    <main className="container flex flex-col items-center justify-between gap-6 px-6 py-12 mx-auto sm:px-24">
      <h1 className="py-3 text-3xl font-semibold tracking-tight transition-colors">
        Tokens
      </h1>
      <TokensOverview
        tokensForOwner={tokensForOwner?.tokens}
        isTokensLoading={isLoading}
        isFetching={isFetching}
      />
      {tokensForOwner?.pageKey && (
        <PaginationBar
          page={page}
          fetchingState={isFetching}
          isPreviousPage={isPreviousData}
          onChange={setPage}
          nextPageKey={tokensForOwner.pageKey}
        />
      )}
    </main>
  )
}
export default Page
