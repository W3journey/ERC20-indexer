"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types/nav"

interface MainNavProps {
  items?: NavItem[]
}
const MainNav = ({ items }: MainNavProps) => {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="items-center">
          <Image
            src={"/Web3Journey-256.png"}
            alt="Web3Journey Logo"
            height={70}
            width={70}
            className="object-fill"
          />
        </div>
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="gap-6 hidden sm:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    pathname === item.href && "text-foreground underline"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
export default MainNav
