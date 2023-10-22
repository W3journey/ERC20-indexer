"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getAddress, isAddress } from "viem"
import { useEnsAddress } from "wagmi"

import { Dashboard } from "@/components/dashboard/dashboard"
import SearchAddress from "@/components/search-address"
import PoweredBy from "@/components/powered-by"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { data: ensAddress } = useEnsAddress({
    name: searchQuery,
    enabled: searchQuery.includes(".eth"),
  })

  const handleSearch = () => {
    try {
      if (isAddress(searchQuery)) {
        const checksumAddress = getAddress(searchQuery)
        router.push(`/address/${checksumAddress}`)
      } else if (searchQuery.includes(".")) {
        if (ensAddress) {
          router.push(`/address/${ensAddress}`)
        } else {
          toast.error("Could not resolve ENS name.", {
            description: "ENS is only supported on Ethereum.",
          })
        }
      } else {
        toast.error("Could not resolve Address/ENS name.")
      }
    } catch (error) {
      toast.error("Invalid Address/ENS name.")
    }
  }

  return (
    <main className="flex flex-col items-center justify-between px-6 sm:px-24 py-12 container mx-auto gap-6">
      <SearchAddress
        onChange={setSearchQuery}
        value={searchQuery}
        onClick={handleSearch}
      />
      <div className="flex flex-col items-center gap-6">
        <Dashboard />
      </div>
      <PoweredBy />
    </main>
  )
}
