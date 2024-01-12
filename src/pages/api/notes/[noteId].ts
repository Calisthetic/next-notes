import { NextApiRequest, NextApiResponse } from "next"
import GetNotes from "./[noteId].get";
import DeleteNote from "./[noteId].delete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetNotes(req, res);
      break;
    case 'DELETE':
      DeleteNote(req, res);
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}