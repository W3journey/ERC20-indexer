import Link from "next/link"
import { FaDiscord, FaGlobe, FaGithub, FaReddit } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface ChainLinksProps {
  className?: string
  urls: {
    homePage?: string
    discord?: string
    github?: string
    reddit?: string | null
  }
}

const ChainLinks: React.FC<ChainLinksProps> = ({ className, urls }) => {
  return (
    <div className={cn("flex h-5 justify-evenly", className)}>
      {urls.homePage && (
        <Link href={urls.homePage} target="_blank" rel="noreferrer">
          <FaGlobe className="w-full h-full hover:text-muted-foreground" />
        </Link>
      )}
      {urls.discord && (
        <Link href={urls.discord} target="_blank" rel="noreferrer">
          <FaDiscord className="w-full h-full hover:text-muted-foreground" />
        </Link>
      )}
      {urls.github && (
        <Link href={urls.github} target="_blank" rel="noreferrer">
          <FaGithub className="w-full h-full hover:text-muted-foreground" />
        </Link>
      )}
      {urls.reddit && (
        <Link href={urls.reddit} target="_blank" rel="noreferrer">
          <FaReddit className="w-full h-full hover:text-muted-foreground" />
        </Link>
      )}
    </div>
  )
}
export default ChainLinks
