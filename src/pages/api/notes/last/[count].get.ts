import { Note } from '@/src/lib/api-classes/note';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { count } = req.query
    if (!count || Array.isArray(count) || isNaN(parseInt(count)) || parseInt(count) < 1) {
      return res.status(400).send({message: 'Bad request'})
    }
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Notes!A2:" + getSheetLetter(new Note([]))
    })
    if (!response.data.values) {
      return res.status(200).json({
        data: []
      })
    }
    let notes = response.data.values.filter(x => x.length > 0 && x[1] === userId && x[4] == "0")
    
    return res.status(200).json({
      data: notes.length <= parseInt(count) ? notes : notes.slice(-parseInt(count))
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}