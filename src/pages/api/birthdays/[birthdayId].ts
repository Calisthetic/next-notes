import { NextApiRequest, NextApiResponse } from "next"
import DeleteBirthday from "./[birthdayId].delete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      DeleteBirthday(req, res);
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}