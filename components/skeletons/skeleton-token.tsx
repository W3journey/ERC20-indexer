import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonToken = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Skeleton className="w-28 h-7" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <Skeleton className="w-12 h-12" />
        <Skeleton className="w-40 h-5" />
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <Skeleton className="w-32 h-4" />
      </CardFooter>
    </Card>
  )
}
export default SkeletonToken
