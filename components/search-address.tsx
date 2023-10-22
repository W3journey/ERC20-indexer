"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchAddressProps {
  onChange: React.Dispatch<React.SetStateAction<string>>
  value: string
  onClick: () => void
}

// TODO implement search not found page? https://etherscan.io/search?f=0&q=testing

const SearchAddress: React.FC<SearchAddressProps> = ({
  onChange,
  value,
  onClick,
}) => {
  return (
    <div className="relative flex space-x-4 bg-muted py-3 px-8 rounded-lg w-full">
      <Input
        className=""
        placeholder="Search by Address/Domain Name"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick()
          }
        }}
      />
      <Button size="icon" className="" onClick={onClick}>
        <Search className="w-5 h-5 " />
      </Button>
    </div>
  )
}
export default SearchAddress
