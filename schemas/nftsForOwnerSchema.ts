import { z } from "zod"

export const ownedNftsSchema = z.object({
  acquiredAt: z.object({
    blockTimestamp: z.nullable(z.string()),
    blockNumber: z.nullable(z.string()),
  }),
  balance: z.string(),
  collection: z.nullable(
    z.object({
      bannerImageUrl: z.nullable(z.string().url()),
      externalUrl: z.nullable(z.string().url()),
      name: z.string(),
      slug: z.string(),
    })
  ),
  contract: z.object({
    address: z.string(),
    contractDeployer: z.nullable(z.string()),
    deployedBlockNumber: z.nullable(z.number()),
    isSpam: z.nullable(z.boolean()),
    name: z.nullable(z.string()),
    openseaMetadata: z
      .object({
        bannerImageUrl: z.string(),
        collectionName: z.string(),
        collectionSlug: z.string(),
        description: z.string(),
        discordUrl: z.nullable(z.string().url()),
        externalUrl: z.nullable(z.string().url()),
        floorPrice: z.number(),
        imageUrl: z.string().url(),
        lastIngestedAt: z.string().datetime(),
        safelistRequestStatus: z.string(),
        twitterUsername: z.string(),
      })
      .optional(),
    spamClassifications: z.array(z.string()),
    symbol: z.nullable(z.string()),
    tokenType: z.string(),
    totalSupply: z.nullable(z.string()),
  }),
  description: z.nullable(z.string()),
  image: z.object({
    cachedUrl: z.nullable(z.string().url()),
    contentType: z.nullable(z.string()),
    originalUrl: z.nullable(z.string()),
    pngUrl: z.nullable(z.string().url()),
    size: z.nullable(z.number()),
    thumbnailUrl: z.nullable(z.string().url()),
  }),
  mint: z.object({
    blockNumber: z.nullable(z.number()),
    mintAddress: z.nullable(z.string()),
    timestamp: z.nullable(z.string().datetime()),
    transactionHash: z.nullable(z.string()),
  }),
  name: z.nullable(z.string()),
  owners: z.nullable(z.unknown()),
  raw: z.object({
    error: z.nullable(z.string()),
    metadata: z.string().or(
      z.object({
        attributes: z
          .array(
            z.object({
              value: z.unknown(),
              trait_type: z.unknown(),
            })
          )
          .optional()
          .or(z.boolean()),
        compiler: z.string().optional(),
        data: z.number().optional(),
        description: z.nullable(z.string().optional()),
        dna: z.string().optional(),
        edition: z.union([z.number().optional(), z.string().optional()]),
        image: z.string().url().optional(),
        name: z.string().optional().or(z.number().optional()),
      })
    ),
    tokenUri: z.nullable(z.string()),
  }),
  timeLastUpdated: z.string().datetime(),
  tokenId: z.string(),
  tokenType: z.string(),
  tokenUri: z.nullable(z.string()),
})

export const nftsForOwnerSchema = z.object({
  ownedNfts: z.array(ownedNftsSchema),
  totalCount: z.number(),
  pageKey: z.nullable(z.string().optional()),
  validAt: z.object({
    blockHash: z.string(),
    blockNumber: z.number(),
    blockTimestamp: z.string(),
  }),
})
