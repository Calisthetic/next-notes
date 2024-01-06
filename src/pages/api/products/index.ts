import { Product } from './../../../lib/api-classes/product';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Products!A2:" + getSheetLetter(new Product([])),
    })
    return res.status(200).json({
      data: response.data.values?.filter(x => x.length > 0),
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}