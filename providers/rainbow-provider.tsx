"use client"

import "@rainbow-me/rainbowkit/styles.css"
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit"
import { useEffect, useState } from "react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, arbitrum } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { useTheme } from "next-themes"

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY!,
    }),
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_API_KEY!,
    }),
    publicProvider(),
  ]
)

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!

const appInfo = {
  appName: "erc20-indexer",
}

const { connectors } = getDefaultWallets({
  appName: appInfo.appName,
  projectId,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export function RainbowProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={darkTheme({ borderRadius: "medium" })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
