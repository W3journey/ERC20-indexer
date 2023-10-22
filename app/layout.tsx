import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

import { RainbowProviders } from "@/providers/rainbow-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import TanstackProvider from "@/providers/tanstack-provider"

import SiteHeader from "@/components/ui/site-header"
import { siteConfig } from "@/config/site"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import Footer from "@/components/footer"
import PoweredBy from "@/components/powered-by"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TanstackProvider>
          <RainbowProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <ScrollToTopButton />
              <Toaster richColors />
              <Footer />
            </ThemeProvider>
          </RainbowProviders>
        </TanstackProvider>
      </body>
    </html>
  )
}
