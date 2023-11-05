"use client"

import { useState } from "react"
import { useNetwork } from "wagmi"

import FilterBar from "@/components/filter-bar"
import NftCard from "@/components/nft-card"
import PaginationBar from "@/components/pagination-bar"
import SkeletonNftCard from "@/components/skeletons/skeleton-nft-card"
import { useDebounce } from "@/hooks/useDebounce"
import useNftsForOwner from "@/hooks/useNftsForOwner"
import EmptyWallet from "@/components/empty-wallet"

const NftOverview = ({ address }: { address?: string }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState<string | null>()
  const [prevPages, setPrevPages] = useState<Array<string | null | undefined>>(
    []
  )
  const debouncedValue = useDebounce(searchQuery)
  const { chain } = useNetwork()

  const { data, isLoading, isFetching, isPreviousData, isError, error } =
    useNftsForOwner(address, chain?.id, page)

  const filteredNfts = data?.ownedNfts.filter((nft) =>
    nft.name?.toLowerCase().includes(debouncedValue)
  )

  const handlePrevPage = () => {
    const previousPage = prevPages[prevPages.length - 1]
    setPrevPages((pageKeys) => [...pageKeys.slice(0, -1)])
    setPage(previousPage)
  }

  const handleNextPage = () => {
    setPrevPages((prevPages) => [...prevPages, page])
    setPage(data?.pageKey)
  }

  if (isError) {
    throw new Error("Failed to fetch NFTs.")
  }

  return (
    <div className="w-full">
      <FilterBar value={searchQuery} onChange={setSearchQuery} />
      <div className="flex flex-col">
        <div className=" grid grid-cols-1 rounded-b-lg bg-muted md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-8 py-4">
          {isLoading ? (
            [...Array(12)].map((_, index) => <SkeletonNftCard key={index} />)
          ) : filteredNfts && filteredNfts?.length > 0 ? (
            filteredNfts?.map((nft, index) => (
              <NftCard
                nftInfo={nft}
                key={`${nft.tokenId}-${index}`}
                isFetching={isFetching}
              />
            ))
          ) : (
            <EmptyWallet
              className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4"
              itemName="NFTs"
            />
          )}
        </div>
        {data?.pageKey && (
          <PaginationBar
            className="ml-auto pt-6"
            fetchingState={isFetching}
            isStaleData={isPreviousData}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            hasNextPage={!!data?.pageKey}
            hasPrevPage={!!prevPages.length}
          />
        )}
      </div>
    </div>
  )
}
export default NftOverview
