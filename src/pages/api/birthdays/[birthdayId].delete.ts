import { Birthday } from '@/src/lib/api-classes/birthday';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function DeleteBirthday(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { birthdayId } = req.query
    if (!birthdayId || Array.isArray(birthdayId)) {
      return res.status(400).send({message: 'Bad request'})
    }
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Birthdays!A2:" + getSheetLetter(new Birthday([]))
    })
    
    if (!response.data.values) {
      return res.status(200).send({data: []})
    }
    const rowId = response.data.values.findIndex(x => x.length !== 0 && x[1] === userId && x[0] === birthdayId) + 2
    if (rowId === 1) {
      return res.status(404).send({message: 'Birthdays not found'})
    }
    
    const response2 = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Birthdays!A" + rowId + ":" + getSheetLetter(new Birthday([])) + rowId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          Array(Object.keys(new Birthday([])).length).fill('')
        ]
      }
    })
    if (!response2.data.updatedCells) {
      return res.status(500).send({message: 'Something went wrong'})
    }
    return res.status(200).json({
      message: "Note deleted successfully"
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}