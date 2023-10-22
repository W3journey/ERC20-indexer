import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { RotateCw } from "lucide-react"

interface FilterBarProps {
  numberOfSelected?: number
  isLoading: boolean
  onClick: () => void
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  className?: string
}

const FilterBar: React.FC<FilterBarProps> = ({
  numberOfSelected,
  isLoading,
  onClick,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-3 justify-between py-6 px-8 bg-muted rounded-t-lg border-b border-muted-foreground/50 z-40 sticky top-16",
        className
      )}
    >
      <div className="relative sm:w-96">
        <Input
          placeholder="Search tokens on this page..."
          className="max-w-lg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value.length > 0 && (
          <Button
            className="absolute top-0 right-0 rounded-l-none"
            onClick={() => onChange("")}
            variant={"ghost"}
          >
            Clear
          </Button>
        )}
      </div>
      {numberOfSelected ? (
        <Button onClick={onClick}>
          Report {numberOfSelected} token{numberOfSelected > 1 && "s"}
          {isLoading && <RotateCw className="animate-spin" />}
        </Button>
      ) : null}
    </div>
  )
}
export default FilterBar
