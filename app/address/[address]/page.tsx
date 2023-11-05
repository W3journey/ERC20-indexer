"use client"

import { useState } from "react"

import TokensOverview from "@/components/tokens-overview"
import { Button } from "@/components/ui/button"
import NftOverview from "@/components/nft-overview"
import { TokenType } from "@/types/tokens"

const Page = ({ params }: { params: { address: string } }) => {
  const address = params.address
  const [selectedTokenType, setSelectedTokenType] = useState<TokenType>("token")

  return (
    <main className="container flex flex-col items-center justify-between pt-12 mx-auto">
      <div className="flex gap-2 w-full">
        <Button
          variant={selectedTokenType === "token" ? "default" : "secondary"}
          onClick={() => setSelectedTokenType("token")}
        >
          Tokens
        </Button>
        <Button
          variant={selectedTokenType === "nft" ? "default" : "secondary"}
          onClick={() => setSelectedTokenType("nft")}
        >
          Nfts
        </Button>
      </div>
      <h1 className="py-3 text-3xl font-semibold tracking-tight transition-colors capitalize">
        {`${selectedTokenType}${"s"}`}
      </h1>
      {selectedTokenType === "token" ? (
        <TokensOverview address={address} />
      ) : (
        <NftOverview address={address} />
      )}
    </main>
  )
}
export default Page
