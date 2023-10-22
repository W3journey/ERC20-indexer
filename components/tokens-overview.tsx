"use client"

import { useState } from "react"
import { z } from "zod"
import { useNetwork } from "wagmi"
import { toast } from "sonner"

import useReportTokens from "@/hooks/useReportTokens"
import TokenCard from "@/components/token-card"
import FilterBar from "@/components/filter-bar"
import { tokenSchema } from "@/schemas/tokensForOwnerSchema"
import { useDebounce } from "@/hooks/useDebounce"
import SkeletonToken from "@/components/skeletons/skeleton-token"

type Token = z.infer<typeof tokenSchema>

interface SearchedTokensProps {
  tokensForOwner?: Token[]
  isTokensLoading: boolean
  isFetching: boolean
}

const TokensOverview: React.FC<SearchedTokensProps> = ({
  tokensForOwner,
  isTokensLoading,
  isFetching,
}) => {
  const [selectedCards, setSelectedCards] = useState<Token[]>([])
  const [tokenSearchQuery, setTokenSearchQuery] = useState("")
  const debouncedValue = useDebounce(tokenSearchQuery)

  const { chain } = useNetwork()

  const { isLoading: isReportLoading, mutate: reportTokens } = useReportTokens({
    stateSetter: () => setSelectedCards([]),
  })

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

  const filteredTokens = tokensForOwner?.filter((token) =>
    token.name?.toLowerCase().includes(debouncedValue)
  )

  return (
    <div>
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
        {isTokensLoading
          ? [...Array(12)].map((_, index) => <SkeletonToken key={index} />)
          : filteredTokens?.map((token, index) => {
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
            })}
      </div>
    </div>
  )
}
export default TokensOverview
