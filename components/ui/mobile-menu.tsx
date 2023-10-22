"use client"
import { LuMenu, LuHome, LuWallet } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ThemeToggle from "@/components/ui/theme-toggle"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { NavItem } from "@/types/nav"
import Link from "next/link"
import { cn } from "@/lib/utils"

const titleToIcon = {
  Home: <LuHome className="w-5 h-5" />,
  Address: <LuWallet className="w-5 h-5" />,
  Portfolio: <LuWallet className="w-5 h-5" />,
}

interface MobileNavProps {
  items?: NavItem[]
}

const MobileMenu: React.FC<MobileNavProps> = ({ items }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <LuMenu />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-[320px] sm:w-[540px]"
        onClick={() => setOpen(false)}
      >
        <div className="flex w-full gap-6 pb-6">
          <CustomConnectButton chainStatus={"none"} showBalance={false} />
          <ThemeToggle />
        </div>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        {items?.length ? (
          <nav className="flex flex-col items-start justify-center gap-6 my-10">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium text-muted-foreground",
                      pathname === item.href && "text-foreground underline"
                    )}
                  >
                    {titleToIcon[item.title as keyof typeof titleToIcon] ||
                      null}
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
export default MobileMenu
