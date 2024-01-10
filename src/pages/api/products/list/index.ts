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
    } else if (!responseProducts.data.values) {
      return res.status(404).send({message: 'No products found'})
    } else if (!responseProductCategories.data.values) {
      return res.status(404).send({message: 'No products found'})
    }
    let productCategories = responseProductCategories.data.values.filter(x => x.length !== 0)
    let products = responseProducts.data.values.filter(x => x.length !== 0)
    let productsOfUsers = responseProductsOfUsers.data.values?.filter(x => x.length !== 0 && x[1] === userId)
    
    for (let i = 0; i < products.length; i++) {
      const categoryId = products[i][2]
      products[i].push(productCategories[productCategories.findIndex(x => x[0] === categoryId)][1])
      if (productsOfUsers) {
        const productOfUserId = productsOfUsers.findIndex(x => x[2] === products[i][0])
        products[i].push(productOfUserId !== -1 ? "1" : "0")
      }
    }

    return res.status(200).json({
      data: products
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}