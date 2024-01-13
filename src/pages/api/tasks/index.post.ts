import { Task } from '@/src/lib/api-classes/task';
import { getId } from '@/src/lib/get-id';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function CreateTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }

    const { time, text } = req.body
    if (typeof time !== 'string' || typeof text !== 'string') {
      return res.status(400).send({message: 'Invalid values'})
    }

    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Tasks!A2" + ":" + getSheetLetter(new Task([])),
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [getId(), userId, time, text, "0"]
        ]
      }
    })

    if (!response.status) {
      return res.status(404).send({message: 'No task created'})
    }
    
    return res.status(200).json({
      message: "Task created successfully"
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}