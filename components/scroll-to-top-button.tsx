"use client"

import { ArrowUpFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrollThreshold = 200
    const currentScrollY = window.scrollY

    setIsVisible(currentScrollY > scrollThreshold)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <Button
      onClick={handleScrollToTop}
      className={cn(
        "ml-auto h-8 w-8 rounded-full sticky bottom-10 right-10",
        isVisible ? "flex" : "hidden"
      )}
      size="icon"
    >
      <ArrowUpFromLine />
    </Button>
  )
}
export default ScrollToTopButton
