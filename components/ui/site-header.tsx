import { ConnectButton } from "@rainbow-me/rainbowkit"

import MainNav from "@/components/ui/main-nav"
import MobileMenu from "@/components/ui/mobile-menu"
import ThemeToggle from "@/components/ui/theme-toggle"
import { siteConfig } from "@/config/site"

const SiteHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* Desktop */}
            <div className="sm:flex hidden space-x-3">
              <ConnectButton
                chainStatus={{
                  smallScreen: "none",
                  largeScreen: "icon",
                }}
                showBalance={false}
                accountStatus={"address"}
              />
              <ThemeToggle />
            </div>
            {/* Mobile */}
            <div className="flex sm:hidden">
              <MobileMenu items={siteConfig.mainNav} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
export default SiteHeader
