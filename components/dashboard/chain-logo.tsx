import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ChainLogoProps {
  url?: string
  className?: string
}

const ChainLogo: React.FC<ChainLogoProps> = ({ url, className }) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="flex items-center justify-center h-full p-16">
        {url && (
          <Image
            src={url}
            alt="logo"
            width={208}
            height={208}
            className="rounded-full"
          />
        )}
      </CardContent>
    </Card>
  )
}
export default ChainLogo
