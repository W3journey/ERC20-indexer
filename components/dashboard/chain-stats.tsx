import { FaHashtag } from "react-icons/fa"

import ChangeIndicator from "@/components/change-indicator"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ChainStatsProps {
  currentPrice?: number
  priceChange?: number
  chainTvl?: string
  marketCap?: number
  marketCapChange?: number
  marketCapRank?: number
  name?: string
  className?: string
}

const ChainStats: React.FC<ChainStatsProps> = ({
  currentPrice,
  priceChange,
  chainTvl,
  marketCap,
  marketCapChange,
  marketCapRank,
  name,
  className,
}) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col text-center space-y-4 text-lg font-semibold">
        <div className="space-y-1">
          <p>Price</p>
          <div className="flex w-full justify-center text-sm font-medium leading-none space-x-2">
            <span>${currentPrice}</span>
            <ChangeIndicator changeValue={priceChange} />
          </div>
        </div>

        <div className="space-y-1">
          <p>Total Value Locked</p>
          <p className="text-sm font-medium leading-none">
            ${Number(chainTvl).toLocaleString()}
          </p>
        </div>

        <div className="space-y-1">
          <p>Market Cap</p>
          <div className="flex w-full justify-center text-sm font-medium leading-none space-x-2">
            <span>${marketCap?.toLocaleString()}</span>
            <ChangeIndicator changeValue={marketCapChange} />
          </div>
        </div>

        <div className="space-y-1">
          <p>Market Cap Rank</p>
          <div className="flex items-center justify-center">
            <FaHashtag className="w-3 h-3" />
            <p className="text-sm font-medium leading-none ordinal">
              {marketCapRank}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex items-center justify-center pb-3">
        Price and market data provided by CoinGecko , while TVL information is
        provided by DefiLlama.
      </CardFooter>
    </Card>
  )
}
export default ChainStats
