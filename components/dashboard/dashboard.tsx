"use client"

import { useAccount, useNetwork } from "wagmi"
import { useTvl } from "@/hooks/useTvl"
import { useCoingeckoCoins } from "@/hooks/useCoingeckoCoins"

import ChainLogo from "@/components/dashboard/chain-logo"
import ChainSocials from "@/components/dashboard/chain-socials"
import ChainDescription from "@/components/dashboard/chain-description"
import ChainStats from "@/components/dashboard/chain-stats"
import SkeletonChainLogo from "@/components/skeletons/skeleton-chain-logo"
import SkeletonChainSocials from "@/components/skeletons/skeleton-chain-socials"
import SkeletonChainStats from "@/components/skeletons/skeleton-chain-stats"
import SkeletonChainDescription from "@/components/skeletons/skeleton-chain-description"

import { getChainId } from "@/lib/utils"

export const Dashboard = () => {
  const { chain } = useNetwork()
  const { isConnected } = useAccount()

  const chainId = getChainId(isConnected, !chain?.unsupported, chain?.id)

  const { data: tvlData } = useTvl()
  const {
    data: coingeckoCoinData,
    isError,
    isLoading,
  } = useCoingeckoCoins(chainId)

  const chainTvlInfo = tvlData?.filter(
    (chainInfo) => chainInfo.chainId === chainId
  )
  const chainTvl = chainTvlInfo ? chainTvlInfo[0]?.tvl?.toFixed(0) : "0"

  const links = {
    homePage: coingeckoCoinData?.links.homepage[0],
    discord: coingeckoCoinData?.links.chat_url.filter((url) =>
      url.includes("discord")
    )[0],
    github: coingeckoCoinData?.links.repos_url.github[0],
    reddit: coingeckoCoinData?.links.subreddit_url,
  }

  if (isLoading)
    return (
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SkeletonChainLogo className="col-span-1" />
        <SkeletonChainStats className="col-span-1 xl:col-span-2" />
        <SkeletonChainSocials className="col-span-1" />
        <SkeletonChainDescription className="col-span-1 lg:col-span-3 xl:col-span-4" />
      </div>
    )

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ChainLogo url={coingeckoCoinData?.image.large} className="col-span-1" />
      <ChainStats
        className="col-span-1 xl:col-span-2"
        chainTvl={chainTvl}
        currentPrice={coingeckoCoinData?.market_data.current_price.usd}
        marketCap={coingeckoCoinData?.market_data.market_cap.usd}
        marketCapChange={
          coingeckoCoinData?.market_data.market_cap_change_percentage_24h
        }
        marketCapRank={coingeckoCoinData?.market_cap_rank}
        priceChange={coingeckoCoinData?.market_data.price_change_24h}
        name={coingeckoCoinData?.name}
      />
      <ChainSocials
        className="col-span-1"
        watchList={coingeckoCoinData?.watchlist_portfolio_users}
        githubStars={coingeckoCoinData?.developer_data.stars}
        redditSubs={coingeckoCoinData?.community_data.reddit_subscribers}
        twitterFollowers={coingeckoCoinData?.community_data.twitter_followers}
        links={links}
      />
      <ChainDescription
        className="col-span-1 lg:col-span-3 xl:col-span-4"
        name={coingeckoCoinData?.name}
        description={coingeckoCoinData?.description.en}
      />
    </div>
  )
}
