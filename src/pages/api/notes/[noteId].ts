import { NextApiRequest, NextApiResponse } from "next"
import DeleteNote from "./[noteId].delete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      DeleteNote(req, res);
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}