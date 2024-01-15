import { Note } from "@/src/lib/api-classes/note";
import { getId } from "@/src/lib/get-id";
import getSheetClient from "@/src/lib/sheet-client";
import { getSheetLetter } from "@/src/lib/sheet-letters";
import { NextApiRequest, NextApiResponse } from "next"

export default async function PatchNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const { id, title, text } = req.body
    if (typeof id !== "string" || typeof title !== "string" || typeof text !== "string") {
      return res.status(400).send({message: 'Bad request'})
    }
    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Notes!A2:" + getSheetLetter(new Note([]))
    })
    if (!response.data.values) {
      return res.status(500).json({message: 'Something went wrong'})
    }
    const tasksData = response.data.values.filter(x => x.length > 0 && x[1] === userId && x[0] === id)
    if (tasksData && tasksData.length !== 1) {
      return res.status(404).json({message: 'Note not found'})
    }
    let currentTask = tasksData[0]
    const rowId = response.data.values.findIndex(x => x[0] === id) + 2
    currentTask[0] = getId()
    currentTask[2] = title
    currentTask[3] = text
    
    const response2 = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Notes!A" + rowId + ":" + getSheetLetter(new Note([])) + rowId,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          currentTask
        ]
      }
    })
    if(response2.status !== 200) {
      return res.status(500).json({message: 'Something went wrong'})
    }
    return res.status(200).json({
      message: 'Note updated'
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}