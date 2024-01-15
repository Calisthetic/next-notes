import { NextApiRequest, NextApiResponse } from "next"
import GetBirthdays from "./[number].get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetBirthdays(req, res);
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}