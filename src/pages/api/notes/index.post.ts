import { Note } from "@/src/lib/api-classes/note";
import { getId } from "@/src/lib/get-id";
import getSheetClient from "@/src/lib/sheet-client";
import { getSheetLetter } from "@/src/lib/sheet-letters";
import { NextApiRequest, NextApiResponse } from "next"

export default async function CreateNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const { id, title, text } = req.body
    if (!title || !text) {
      return res.status(400).send({message: 'Bad request'})
    }
    const sheets = await getSheetClient();    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Notes!A2:" + getSheetLetter(new Note([])),
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          id ? id : getId(),
          userId,
          title,
          text
        ]]
      }
    })
    if (response.status !== 200) {
      return res.status(500).json({message: 'Something went wrong'})
    }
    return res.status(200).json({
      message: 'Note created'
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}