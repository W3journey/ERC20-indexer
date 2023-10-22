import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonChainStats = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-center">
          <Skeleton className="w-32 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-44" />
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="w-8 h-4" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center pb-3 text-xs text-muted-foreground">
        Price and market data provided by CoinGecko , while TVL information is
        provided by DefiLlama.
      </CardFooter>
    </Card>
  )
}
export default SkeletonChainStats
