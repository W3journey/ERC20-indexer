import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationBarProps {
  page?: string
  isPreviousPage?: boolean
  nextPageKey?: string
  fetchingState: boolean
  onChange: (key?: string) => void
  className?: string
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  isPreviousPage,
  nextPageKey,
  fetchingState,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex gap-3 ml-auto", className)}>
      <Button
        size={"sm"}
        variant={!page ? "secondary" : "default"}
        disabled={!page || fetchingState}
        onClick={() => {
          onChange(undefined)
        }}
      >
        Previous
      </Button>
      <Button
        size={"sm"}
        variant={!nextPageKey ? "secondary" : "default"}
        disabled={!nextPageKey || fetchingState}
        onClick={() => {
          if (!isPreviousPage && nextPageKey) {
            onChange(nextPageKey)
          }
        }}
      >
        Next
      </Button>
    </div>
  )
}
export default PaginationBar
