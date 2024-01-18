import { Product } from '@/src/lib/api-classes/product';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const sheets = await getSheetClient();
    const responseProducts = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Products!A2:" + getSheetLetter(new Product([])),
    })

    if (!responseProducts.data.values) {
      return res.status(200).send({data: []})
    }
    let products = responseProducts.data.values.filter(x => x.length !== 0)
    
    return res.status(200).json({
      data: products
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}