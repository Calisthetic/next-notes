import { Product } from "@/src/lib/api-classes/product";
import getSheetClient from "@/src/lib/sheet-client";
import { getSheetLetter } from "@/src/lib/sheet-letters";
import { NextApiRequest, NextApiResponse } from "next"

export default async function DeleteProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const { productId } = req.query
    if (typeof productId !== "string") {
      return res.status(400).send({message: 'Bad request'})
    }

    const sheets = await getSheetClient();
    const responseProducts = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Products!A2:" + getSheetLetter(new Product([])),
    })

    if (!responseProducts.data.values) {
      return res.status(404).send({message: 'No products found'})
    }
    const rowId = responseProducts.data.values.findIndex(x => x.length !== 0 && x[1] === userId && x[0] === productId) + 2
    if (rowId === 1) {
      return res.status(404).send({message: 'Product not found'})
    }
    
    const response2 = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Products!A" + rowId + ":" + getSheetLetter(new Product([])) + rowId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          Array(Object.keys(new Product([])).length).fill('')
        ]
      }
    })
    if (!response2.data.updatedCells) {
      return res.status(500).send({message: 'Something went wrong'})
    }
    
    return res.status(200).json({
      message: "Product deleted successfully"
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}