import { NextResponse } from "next/server"
import { z } from "zod"

import supabase from "@/lib/supabase"
import {
  handleGeneralError,
  handleSupabaseQueryError,
  handleValidationError,
} from "@/lib/errors"
import { getSpamTokensTableName } from "@/lib/utils"
import { chainIdSchema } from "@/schemas/chainIdSchema"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chainId = searchParams.get("chainId")

  try {
    const validatedChainId = chainIdSchema.parse(chainId)

    const tableName = getSpamTokensTableName(validatedChainId)

    const { data: spamTokens, error } = await supabase.from(tableName).select()

    if (error) {
      return handleSupabaseQueryError(
        error,
        "GETSPAMTOKENS_GET",
        "Error retrieving tokens"
      )
    }

    if (!spamTokens || spamTokens.length === 0) {
      return new NextResponse("No tokens retrieved", { status: 204 })
    }

    return NextResponse.json(spamTokens)
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return handleValidationError(
        error,
        "GETSPAMTOKENS_GET",
        "Invalid ChainId"
      )
    }

    // Handle other errors
    return handleGeneralError(error, "[GETSPAMTOKENS_GET]")
  }
}
