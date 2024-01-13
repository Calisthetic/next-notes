import { NextApiRequest, NextApiResponse } from "next"
import GetProducts from "./index.get";
import CreateProduct from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetProducts(req, res);
      break;
    case 'POST':
      CreateProduct(req, res);
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}