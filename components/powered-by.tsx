import Image from "next/image"
import Link from "next/link"

const PoweredBy = () => {
  return (
    <div className="">
      <h3 className="text-2xl font-semibold tracking-tight text-center py-12">
        Powered by
      </h3>
      <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
        {/* CoinGecko */}
        <div>
          <Link
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted hover:scale-105"
            href={"https://coingecko.com/"}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/CoinGecko.svg"}
              alt="CoinGecko"
              width={50}
              height={50}
            />
          </Link>
          <h3 className="mt-8 text-xl font-semibold tracking-tight">
            CoinGecko
          </h3>
          <p className="mt-4 leading-7">
            CoinGecko provides a fundamental analysis of the digital currency
            market. In addition to tracking price, volume, and market
            capitalization, CoinGecko tracks community growth, open source code
            development, major events, and on-chain metrics.
          </p>
        </div>
        {/* Alchemy */}
        <div>
          <Link
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted hover:scale-105"
            href={"https://alchemy.com/"}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/alchemy.svg"}
              alt="Alchemy"
              width={50}
              height={50}
              className="mb-2"
            />
          </Link>
          <h3 className="mt-8 text-xl font-semibold tracking-tight">Alchemy</h3>
          <p className="mt-4 leading-7">
            Alchemy provides the leading blockchain development platform
            powering millions of users in 197 countries worldwide. Our mission
            is to provide developers with the fundamental building blocks they
            need to create the future of technology.
          </p>
        </div>
        {/* DefiLlama */}
        <div>
          <Link
            href={"https://defillama.com/"}
            target="_blank"
            rel="noreferrer"
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted hover:scale-105"
          >
            <Image
              src={"/defillama-logo.png"}
              alt="DefiLlama"
              width={40}
              height={40}
              className="ml-2"
            />
          </Link>
          <h3 className="mt-8 text-xl font-semibold tracking-tight">
            DefiLlama
          </h3>
          <p className="mt-4 leading-7">
            DefiLlama is a crypto data website. It takes publicly available
            blockchain data and breaks it down into easy-to-read charts, graphs,
            and tables that anyone can understand. DefiLlama data is free and
            open-source.
          </p>
        </div>
      </div>
    </div>
  )
}
export default PoweredBy
