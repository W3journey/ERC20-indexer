import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonNftCard = () => {
  return (
    <Card className="w-[282px]">
      <div className="w-[281px] h-[281px] border bg-card flex items-center justify-center overflow-hidden">
        <Skeleton className="w-[280px] h-[280px] rounded-t-none" />
      </div>
      <CardContent>
        <div className="text-sm font-semibold flex flex-col gap-2 mt-2">
          <Skeleton className="w-36 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
export default SkeletonNftCard
