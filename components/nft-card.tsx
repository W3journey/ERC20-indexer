"use client"

import { useState } from "react"
import Image from "next/image"
import { z } from "zod"
import { LuImageOff } from "react-icons/lu"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ownedNftsSchema } from "@/schemas/nftsForOwnerSchema"
import { cn } from "@/lib/utils"

interface NftCardProps {
  nftInfo?: z.infer<typeof ownedNftsSchema>
  isFetching: boolean
}

const NftCard: React.FC<NftCardProps> = ({ nftInfo, isFetching }) => {
  const [imageLoadError, setImageLoadError] = useState(false)

  const isAllowedDomain = (url: string) => {
    const allowedDomains = [
      "nft-cdn.alchemy.com",
      "res.cloudinary.com",
      "ipfs.io",
    ]
    return allowedDomains.some((domain) => url.includes(domain))
  }

  const selectImageUrl = () => {
    const urlsToCheck = [
      nftInfo?.image.cachedUrl,
      nftInfo?.contract.openseaMetadata?.imageUrl,
      nftInfo?.image.originalUrl,
      nftInfo?.image.pngUrl,
      nftInfo?.image.thumbnailUrl,
    ]

    const allowedUrl = urlsToCheck.find((url) => url && isAllowedDomain(url))

    return allowedUrl || null
  }

  const nftName = nftInfo?.name ?? "unknown"
  const nftCollectionName =
    nftInfo?.collection?.name ?? nftInfo?.contract.symbol
  const imageUrl = selectImageUrl()

  return (
    <Card
      className={cn(
        "overflow-hidden",
        isFetching && "bg-card/70 text-primary/70"
      )}
    >
      <div className="w-full h-[280px] border-b bg-card flex items-center justify-center overflow-hidden relative">
        {imageUrl && !imageLoadError ? (
          <Image
            src={imageUrl}
            alt="Nft Picture"
            fill
            sizes="33vw"
            onError={() => setImageLoadError(true)}
            className={cn(
              "hover:scale-125 ease-in-out transition-all transform duration-300 w-[280px] h-[280px] object-fill",
              isFetching && "opacity-70"
            )}
          />
        ) : (
          <div className="flex items-center justify-center">
            <LuImageOff className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent>
        <div className="text-sm font-semibold flex flex-col gap-2 mt-2">
          <span className="capitalize line-clamp-1">{nftName}</span>
          <span>{nftCollectionName}</span>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
export default NftCard
