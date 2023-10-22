import SkeletonChainLinks from "@/components/skeletons/skeleton-chain-links"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const SkeletonChainSocials = ({ className }: { className?: string }) => {
  return (
    <Card
      className={cn("flex flex-col justify-between text-center", className)}
    >
      <CardHeader>
        <CardTitle>Social Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex flex-col">
        <div className="flex items-center space-x-2 ml-6">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-36 h-4" />
        </div>
        <div className="flex items-center space-x-2 ml-6">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="flex items-center space-x-2 ml-6">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-36 h-4" />
        </div>
        <div className="flex items-center space-x-2 ml-6">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-32 h-4" />
        </div>
      </CardContent>
      <CardFooter className="">
        <SkeletonChainLinks className="space-x-2 ml-auto mr-6" />
      </CardFooter>
    </Card>
  )
}
export default SkeletonChainSocials
