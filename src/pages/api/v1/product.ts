import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const soldOutInput: boolean | undefined = req.query.soldOut
    ? JSON.parse(req.query.soldOut as string)
    : undefined;

  const decafInput: boolean | undefined = req.query.decaf
    ? JSON.parse(req.query.decaf as string)
    : undefined;

  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      weight: true,
      process: true,
      productUrl: true,
      imageUrl: true,
      soldOut: true,
      discoveredDateTime: true,
      handle: true,
      price: true,
      decaf: true,
      brand: {
        select: {
          name: true,
        },
      },
      countryOfOrigin: {
        select: {
          name: true,
          continent: {
            select: {
              name: true,
            },
          },
        },
      },
      vendor: {
        select: {
          currencyCode: {
            select: {
              code: true,
            },
          },
          country: {
            select: {
              name: true,
            },
          },
        },
      },
      processCategory: {
        select: {
          name: true,
        },
      },
      productType: {
        select: {
          name: true,
        },
      },
      tastingNote: {
        select: {
          tasting_note: {
            select: {
              name: true,
            },
          },
        },
      },
      variety: {
        select: {
          variety: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      AND: [
        {
          brand: {
            name: {
              in:
                typeof req.query.brand === 'string'
                  ? [req.query.brand]
                  : req.query.brand,
            },
          },
          countryOfOrigin: {
            name: {
              in:
                typeof req.query.countryOfOrigin === 'string'
                  ? [req.query.countryOfOrigin]
                  : req.query.countryOfOrigin,
            },
          },
          vendor: {
            name: {
              in:
                typeof req.query.vendor === 'string'
                  ? [req.query.vendor]
                  : req.query.vendor,
            },
          },
          processCategory: {
            name: {
              in:
                typeof req.query.processCategory === 'string'
                  ? [req.query.processCategory]
                  : req.query.processCategory,
            },
          },
          productType: {
            name: {
              in:
                typeof req.query.productType === 'string'
                  ? [req.query.productType]
                  : req.query.productType,
            },
          },
          soldOut: soldOutInput,
          decaf: decafInput,
          variety: {
            some: {
              variety: {
                name: {
                  in:
                    typeof req.query.variety === 'string'
                      ? [req.query.variety]
                      : req.query.variety,
                },
              },
            },
          },
        },
        {
          tastingNote: {
            some: {
              tasting_note: {
                name: {
                  in:
                    typeof req.query.tastingNote === 'string'
                      ? [req.query.tastingNote]
                      : req.query.tastingNote,
                },
              },
            },
          },
        },
      ],
    },
  });
  return res.status(200).json(products);
}
