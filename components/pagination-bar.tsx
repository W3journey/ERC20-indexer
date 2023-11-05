import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationBarProps {
  isStaleData?: boolean
  hasNextPage?: boolean
  hasPrevPage?: boolean
  fetchingState: boolean
  nextPage: () => void
  prevPage: () => void
  className?: string
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  isStaleData,
  hasNextPage,
  hasPrevPage,
  fetchingState,
  nextPage,
  prevPage,
  className,
}) => {
  return (
    <div className={cn("flex gap-3 ml-auto", className)}>
      <Button
        size={"sm"}
        variant={hasNextPage ? "secondary" : "default"}
        disabled={!hasPrevPage || fetchingState}
        onClick={() => {
          prevPage()
        }}
      >
        Previous
      </Button>
      <Button
        size={"sm"}
        variant={!hasNextPage ? "secondary" : "default"}
        disabled={!hasNextPage || fetchingState}
        onClick={() => {
          if (!isStaleData && hasNextPage) {
            nextPage()
          }
        }}
      >
        Next
      </Button>
    </div>
  )
}
export default PaginationBar
