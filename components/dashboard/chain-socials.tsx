import Image from "next/image"
import { FaGithub, FaReddit, FaTwitter } from "react-icons/fa"

import ChainLinks from "@/components/dashboard/chain-links"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ChainSocialsProps {
  watchList?: number
  twitterFollowers?: number
  redditSubs?: number
  githubStars?: number
  links: {
    homePage?: string
    discord?: string
    github?: string
    reddit?: string | null
  }
  className?: string
}

const ChainSocials: React.FC<ChainSocialsProps> = ({
  watchList,
  twitterFollowers,
  redditSubs,
  githubStars,
  links,
  className,
}) => {
  return (
    <Card
      className={cn("flex flex-col justify-between text-center", className)}
    >
      <CardHeader>
        <CardTitle>Social Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        {/* Coingecko Watch Lists */}
        {watchList && (
          <div className="flex items-center ml-6 space-x-2">
            <Image
              src={"/CoinGecko.svg"}
              alt="coin gecko"
              width={20}
              height={20}
            />
            <span>{watchList} Watchlists</span>
          </div>
        )}
        {/* Twitter Followers */}
        {twitterFollowers && (
          <div className="flex items-center ml-6 space-x-2">
            <FaTwitter className="w-5 h-5 text-sky-500" />
            <p>{twitterFollowers} Followers</p>
          </div>
        )}
        {/* Reddit Subscribers */}
        {redditSubs ? (
          <div className="flex items-center ml-6 space-x-2">
            <FaReddit className="w-5 h-5 text-orange-600" />
            <span>{redditSubs} Subscribers</span>
          </div>
        ) : null}
        {/* Github Stars */}
        {githubStars ? (
          <div className="flex items-center ml-6 space-x-2">
            <FaGithub className="w-5 h-5 text-neutral-800 dark:text-slate-200" />
            <span>{githubStars} Stars</span>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="">
        <ChainLinks className="ml-auto mr-6 space-x-2" urls={links} />
      </CardFooter>
    </Card>
  )
}
export default ChainSocials
