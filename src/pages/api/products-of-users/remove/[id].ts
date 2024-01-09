import { ProductOfUser } from '@/src/lib/api-classes/products-of-user';
import { Task } from '@/src/lib/api-classes/task';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'DELETE') {
      res.status(405).send({message: 'Only DELETE requests are allowed'})
    }
    const { id } = req.query
    if (!id || Array.isArray(id)) {
      return res.status(400).send({message: 'Bad request'})
    }
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "ProductsOfUsers!A2:" + getSheetLetter(new ProductOfUser([]))
    })
    if (!response.data.values) {
      return res.status(500).json({message: 'Something went wrong'})
    }
    const userProductsData = response.data.values.filter(x => x.length > 0 && x[1] === userId && x[0] === id)
    if (userProductsData && userProductsData.length !== 1) {
      return res.status(404).json({message: 'Product not found'})
    }
    const rowId = response.data.values.findIndex(x => x[1] === userId && x[0] === id) + 2
    
    const response2 = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "ProductsOfUsers!A" + rowId + ":" + getSheetLetter(new ProductOfUser([])) + rowId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          Array(Object.keys(new ProductOfUser([])).length).fill("")
        ]
      }
    })
    if(response2.status !== 200) {
      return res.status(500).json({message: 'Something went wrong'})
    }
    return res.status(200).json({
      message: 'Task updated'
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}