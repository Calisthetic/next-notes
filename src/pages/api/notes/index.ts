import { NextApiRequest, NextApiResponse } from "next"
import GetNotes from './index.get';
import PatchNotes from './index.patch';
import CreateNote from './index.post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await GetNotes(req, res)
      break;
    case 'PATCH':
      await PatchNotes(req, res)
      break;
    case 'POST':
      await CreateNote(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}