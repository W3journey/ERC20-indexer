import { NextResponse } from "next/server"
import { z } from "zod"

import supabase from "@/lib/supabase"
import { getSpamTokensTableName } from "@/lib/utils"
import { handleGeneralError, handleValidationError } from "@/lib/errors"
import { reportSpamTokensSchema } from "@/schemas/spamTokensSchema"

//TODO add some kind of requirement to allow people to use this
export async function POST(request: Request) {
  const body = await request.json()

  try {
    const validatedBody = reportSpamTokensSchema.parse(body)
    const { tokens, chainId } = validatedBody

    const tableName = getSpamTokensTableName(chainId.toString())
    const { data } = await supabase.from(tableName).upsert(tokens).select()

    return NextResponse.json(data, {
      status: 200,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return handleValidationError(
        error,
        "REPORTSPAMTOKEN_POST",
        "Invalid request"
      )
    }

    // Handle other errors
    return handleGeneralError(error, "[REPORTSPAMTOKEN_POST]")
  }
}
