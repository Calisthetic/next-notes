import { Note } from '@/src/lib/api-classes/note';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"
import GetNotes from './get-notes';
import PatchNotes from './patch-notes';

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
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}