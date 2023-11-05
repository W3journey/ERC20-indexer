"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useNetwork } from "wagmi"

import TokensOverview from "@/components/tokens-overview"
import { Button } from "@/components/ui/button"
import NftOverview from "@/components/nft-overview"
import { TokenType } from "@/types/tokens"

export default function PortfolioPage() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
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
      {!isConnected || chain?.unsupported ? (
        <div className="flex flex-col justify-center h-96">
          <ConnectButton />
        </div>
      ) : selectedTokenType === "token" ? (
        <TokensOverview address={address} />
      ) : (
        <NftOverview address={address} />
      )}
    </main>
  )
}
