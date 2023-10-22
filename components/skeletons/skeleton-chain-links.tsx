import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const SkeletonChainLinks = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-evenly", className)}>
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="w-5 h-5 rounded-full" />
      ))}
    </div>
  )
}
export default SkeletonChainLinks
