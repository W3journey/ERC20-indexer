import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonChainLogo = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardContent className="flex items-center justify-center h-full p-16">
        <Skeleton className="w-[208px] h-[208px]" />
      </CardContent>
    </Card>
  )
}
export default SkeletonChainLogo
