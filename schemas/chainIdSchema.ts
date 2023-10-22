import { z } from "zod"

export const chainIdSchema = z
  .string()
  .refine((value) => value === "1" || value === "42161", {
    message: "Invalid ChainId",
  })
