import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonChainDescription = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-center">
          <Skeleton className="h-6 w-52" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-3 px-12 pb-12">
        {/* text */}
        <Skeleton className="w-full h-4 mt-6" />
        <Skeleton className="w-full h-4" />
        {/* button */}
        <Skeleton className="h-10 mt-10 rounded-lg w-28" />
      </CardContent>
    </Card>
  )
}
export default SkeletonChainDescription
