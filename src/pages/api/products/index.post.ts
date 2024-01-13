import { Product } from '@/src/lib/api-classes/product';
import { getId } from '@/src/lib/get-id';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function CreateProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }

    const { name, id } = req.body
    if (typeof name !== 'string') {
      return res.status(400).send({message: 'Invalid values'})
    }

    let values:any[] = []
    const names:string[] = name.split(/[;,.\n]+/)
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i].trim()
      if(names[i].length === 0) {
        continue
      }
      values.push([
        id ? id : getId(),
        userId,
        names[i]
      ])
    }

    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Products!A2" + ":" + getSheetLetter(new Product([])),
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: values
      }
    })

    if (!response.status) {
      return res.status(404).send({message: 'No product created'})
    }
    
    return res.status(200).json({
      message: "Product created successfully"
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}