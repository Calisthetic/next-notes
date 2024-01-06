import { Product } from '@/src/lib/api-classes/product';
import { ProductOfUser } from '@/src/lib/api-classes/products-of-user';
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
    let responseProductsOfUsers = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "ProductsOfUsers!A2:" + getSheetLetter(new ProductOfUser([]))
    })
    const responseProducts = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Products!A2:" + getSheetLetter(new Product([])),
    })
    const responseProductCategories = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "ProductCategories!A2:" + getSheetLetter(new Product([])),
    })

    if (responseProductsOfUsers.status !== 200) {
      return res.status(responseProductsOfUsers.status).send({message: responseProductsOfUsers.statusText})
    } else if (!responseProductsOfUsers.data.values) {
      return res.status(404).send({message: 'No products found'})
    } else if (!responseProducts.data.values) {
      return res.status(404).send({message: 'No products found'})
    } else if (!responseProductCategories.data.values) {
      return res.status(404).send({message: 'No products found'})
    }
    
    for (let i = 0; i < responseProductsOfUsers.data.values.length; i++) {
      const productId = responseProductsOfUsers.data.values[i][2]
      const productObjectId = responseProducts.data.values.findIndex(x => x[0] === productId)
      if (productObjectId === -1) {
        return res.status(500).send({message: 'Something went wrong'})
      }
      responseProductsOfUsers.data.values[i][2] = responseProducts.data.values[productObjectId][1]
      const categotyId = responseProducts.data.values[productObjectId][2]
      responseProductsOfUsers.data.values[i].push(responseProductCategories.data.values[categotyId - 1][1])
    }
    return res.status(200).json({
      data: responseProductsOfUsers.data.values
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}