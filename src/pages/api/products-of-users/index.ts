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
      return res.status(200).send({data: []})
    } else if (!responseProducts.data.values) {
      return res.status(404).send({message: 'No products found'})
    } else if (!responseProductCategories.data.values) {
      return res.status(404).send({message: 'No products found'})
    }
    let productCategories = responseProductCategories.data.values.filter(x => x.length !== 0)
    let products = responseProducts.data.values.filter(x => x.length !== 0)
    let productsOfUsers = responseProductsOfUsers.data.values.filter(x => x.length !== 0)
    
    for (let i = 0; i < productsOfUsers.length; i++) {
      const productId = productsOfUsers[i][2]
      const productObjectId = products.findIndex(x => x[0] === productId)
      if (productObjectId === -1) {
        return res.status(500).send({message: 'Something went wrong'})
      }
      productsOfUsers[i][2] = products[productObjectId][1]
      const categotyId = products[productObjectId][2]
      productsOfUsers[i].push(productCategories[categotyId - 1][1])
    }
    return res.status(200).json({
      data: productsOfUsers
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}