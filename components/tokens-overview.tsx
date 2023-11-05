"use client"

import { useState } from "react"
import { z } from "zod"
import { useAccount, useNetwork } from "wagmi"
import { toast } from "sonner"

import TokenCard from "@/components/token-card"
import FilterBar from "@/components/filter-bar"
import SkeletonToken from "@/components/skeletons/skeleton-token"
import PaginationBar from "@/components/pagination-bar"
import { useDebounce } from "@/hooks/useDebounce"
import useTokensForOwner from "@/hooks/useTokensForOwner"
import useReportTokens from "@/hooks/useReportTokens"
import { getChainId } from "@/lib/utils"
import { tokenSchema } from "@/schemas/tokensForOwnerSchema"
import EmptyWallet from "@/components/empty-wallet"

type Token = z.infer<typeof tokenSchema>

interface SearchedTokensProps {
  address?: string
}

const TokensOverview: React.FC<SearchedTokensProps> = ({ address }) => {
  const [selectedCards, setSelectedCards] = useState<Token[]>([])
  const [tokenSearchQuery, setTokenSearchQuery] = useState("")
  const [page, setPage] = useState<string>()
  const [prevPages, setPrevPages] = useState<Array<string | undefined>>([])
  const debouncedValue = useDebounce(tokenSearchQuery)

  const { chain } = useNetwork()
  const { isConnected } = useAccount()
  const chainId = getChainId(isConnected, !chain?.unsupported, chain?.id)

  const {
    data: tokensForOwner,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
  } = useTokensForOwner(address, page, chainId)

  const { isLoading: isReportLoading, mutate: reportTokens } = useReportTokens({
    stateSetter: () => setSelectedCards([]),
  })

  const handlePrevPage = () => {
    const previousPage = prevPages[prevPages.length - 1]
    setPrevPages((pageKeys) => [...pageKeys.slice(0, -1)])
    setPage(previousPage)
  }

  const handleNextPage = () => {
    setPrevPages((prevPages) => [...prevPages, page])
    setPage(tokensForOwner?.pageKey)
  }

  const handleCardSelect = (token: Token) => {
    setSelectedCards((prevSelected) => {
      const isTokenSelected = prevSelected.some(
        (selectedToken) =>
          selectedToken.contractAddress === token.contractAddress
      )

      if (isTokenSelected) {
        return prevSelected.filter(
          (selectedToken) =>
            selectedToken.contractAddress !== token.contractAddress
        )
      } else {
        return [...prevSelected, token]
      }
    })
  }

  const handleReportTokens = () => {
    if (!chain?.id) {
      return toast.error("No Network Detected")
    } else {
      reportTokens({
        tokens: [...selectedCards],
        chainId: chain.id,
      })
    }
  }

  const filteredTokens = tokensForOwner?.tokens
    .filter((token) => token.name?.toLowerCase().includes(debouncedValue))
    .filter((token) => token.rawBalance !== "0")

  if (isError) {
    throw new Error("Failed to fetch ERC-20 Tokens.")
  }

  return (
    <div className="w-full">
      {!chain?.unsupported && (
        <FilterBar
          isLoading={isReportLoading}
          numberOfSelected={selectedCards.length}
          value={tokenSearchQuery}
          onChange={setTokenSearchQuery}
          onClick={handleReportTokens}
        />
      )}
      <div className="grid w-full grid-cols-1 gap-5 p-8 mx-auto rounded-b-lg bg-muted md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-stretch">
        {isLoading ? (
          [...Array(12)].map((_, index) => <SkeletonToken key={index} />)
        ) : filteredTokens && filteredTokens.length > 0 ? (
          filteredTokens?.map((token, index) => {
            if (
              !token.name ||
              token.error ||
              token.possibleSpam
              // || token.symbol?.toLowerCase().includes("visit")
            )
              return null

            return (
              <TokenCard
                key={token.contractAddress}
                tokenInfo={token}
                isFetching={isFetching}
                isSelected={selectedCards.some(
                  (selectedToken) =>
                    selectedToken.contractAddress === token.contractAddress
                )}
                onSelect={() => handleCardSelect(token)}
              />
            )
          })
        ) : (
          <EmptyWallet
            className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4"
            itemName="ERC-20 Tokens"
          />
        )}
      </div>
      {tokensForOwner?.pageKey && (
        <PaginationBar
          className="ml-auto pt-2"
          fetchingState={isFetching}
          isStaleData={isPreviousData}
          nextPage={handleNextPage}
          prevPage={handlePrevPage}
          hasNextPage={!!tokensForOwner.pageKey}
          hasPrevPage={!!prevPages.length}
        />
      )}
    </div>
  )
}
export default TokensOverview
