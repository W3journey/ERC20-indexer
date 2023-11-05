import { NextResponse } from "next/server"
import { z } from "zod"

import { addressSchema } from "@/schemas/addressSchema"
import supabase from "@/lib/supabase"
import { chainIdSchema } from "@/schemas/chainIdSchema"
import { getSpamTokensTableName } from "@/lib/utils"
import { alchemyClient } from "@/lib/alchemy-client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chainId = searchParams.get("chainId") || "1"

  const alchemy = alchemyClient(chainId)

  try {
    const address = addressSchema.parse(searchParams.get("address"))
    const page = searchParams.get("pageKey") || undefined

    const validatedChainId = chainIdSchema.parse(chainId)
    const tableName = getSpamTokensTableName(validatedChainId)

    const ownedTokensResponse = await alchemy.core.getTokensForOwner(address, {
      pageKey: page,
    })

    const { tokens: ownedTokens, pageKey } = ownedTokensResponse

    const { data: spamTokens, error } = await supabase.from(tableName).select()

    if (error) {
      console.error("[GETTOKENSFOROWNER_GET] - Supabase Query Error:", error)
      return new NextResponse("Error retrieving spam tokens", { status: 500 })
    }

    if (!ownedTokens.length || !spamTokens) {
      return new NextResponse("No tokens retrieved", { status: 204 })
    }

    const ownedTokensWithSpam = ownedTokens.map((ownedToken) => {
      const spamToken = spamTokens.find(
        (spamToken) =>
          spamToken.contractAddress.toLowerCase() ===
          ownedToken.contractAddress.toLowerCase()
      )
      return {
        ...ownedToken,
        possibleSpam: !!spamToken,
      }
    })

    const tokensForOwner = {
      pageKey: pageKey,
      tokens: ownedTokensWithSpam,
    }

    return NextResponse.json(tokensForOwner)
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return new NextResponse(`Invalid address: ${error.errors}`, {
        status: 400,
      })
    }

    // Handle other errors
    console.error("[GETTOKENSFOROWNER_GET] - Unhandled error:", error)
    return new NextResponse("Internal Server Error", {
      status: 500,
    })
  }
}
