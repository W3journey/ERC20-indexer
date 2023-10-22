import { NextResponse } from "next/server"
import { z } from "zod"

// Utility function for handling zod validation errors
export const handleValidationError = (
  error: z.ZodError,
  route: string,
  logMessage: string
) => {
  return new NextResponse(`[${route}] - ${logMessage}: ${error.errors}`, {
    status: 400,
  })
}

// Utility function for handling general errors
export const handleGeneralError = (error: unknown, route: string) => {
  console.error(`[${route}] - Unhandled error:`, error)
  return new NextResponse("Internal Server Error", {
    status: 500,
  })
}

export const handleSupabaseQueryError = (
  error: unknown,
  route: string,
  logMessage: string
) => {
  console.error(`[${route}] - Supabase Query Error: ${error}`)
  return new NextResponse(`${logMessage}`, { status: 500 })
}
