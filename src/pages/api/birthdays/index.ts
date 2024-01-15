import { NextApiRequest, NextApiResponse } from "next"
import GetBirthdays from './index.get';
import CreateBirthday from "./index.post";
import PatchBirthday from "./index.patch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await GetBirthdays(req, res)
      break;
    case 'POST':
      await CreateBirthday(req, res)
      break;
    case 'PATCH':
      await PatchBirthday(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}