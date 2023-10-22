"use client"

import Image from "next/image"
import Link from "next/link"
import { z } from "zod"
import { FaEthereum } from "react-icons/fa"
import { ExternalLink, MinusCircle } from "lucide-react"
import { useNetwork } from "wagmi"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn, truncateAddress } from "@/lib/utils"
import { tokenSchema } from "@/schemas/tokensForOwnerSchema"

interface TokenCardProps {
  tokenInfo: z.infer<typeof tokenSchema>
  className?: string
  isSelected: boolean
  isFetching: boolean
  onSelect: (token: z.infer<typeof tokenSchema>) => void
}

const TokenCard: React.FC<TokenCardProps> = ({
  tokenInfo,
  className,
  isSelected,
  isFetching,
  onSelect,
}) => {
  const { contractAddress, balance, logo, name, symbol } = tokenInfo
  const { chain } = useNetwork()

  const getPreciseBalance = (value: string) => {
    const balance = Number(value)
    return balance > 10_000 ? balance.toFixed(0) : balance.toFixed(8)
  }

  const handleCardClick = () => {
    onSelect(tokenInfo)
  }

  const blockExplorerUrl = chain?.id === 1 ? "etherscan" : "arbiscan"

  return (
    <Card
      className={cn(
        "relative hover:scale-105 duration-150 hover:cursor-pointer",
        className,
        isFetching && "bg-card/70 text-primary/70",
        isSelected &&
          "bg-background/20 dark:bg-background/30 border-rose-500 dark:border-rose-800 border-2"
      )}
      onClick={handleCardClick}
    >
      {isSelected && (
        <MinusCircle className="text-rose-600 absolute top-2 right-2 rounded-full overflow-hidden" />
      )}
      <CardHeader>
        <CardTitle className="text-center line-clamp-1">
          {name ? name : "Unknown"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 font-semibold tracking-tight">
        <div
          className={cn(
            "w-14 h-14 bg-white flex items-center justify-center border border-slate-500 rounded",
            isFetching && "opacity-50"
          )}
        >
          {logo ? (
            <Image src={logo} alt={`${name} logo`} width={50} height={50} />
          ) : (
            <FaEthereum className="bg-muted-foreground w-12 h-12 p-1 text-muted" />
          )}
        </div>
        <p className="space-x-1">
          <span>{balance && getPreciseBalance(balance)}</span>
          <span className="break-all">{symbol?.slice(0, 16)}</span>
        </p>
      </CardContent>
      <CardFooter
        className={cn(
          "flex items-center justify-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium leading-none",
          isFetching && "opacity-50"
        )}
      >
        <Link
          href={`https://${blockExplorerUrl}.io/address/${contractAddress}`}
          target="_blank"
          rel="noreferrer"
          className="break-all"
          onClick={(e) => e.stopPropagation()}
        >
          {truncateAddress(contractAddress)}
        </Link>
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
      </CardFooter>
    </Card>
  )
}
export default TokenCard
