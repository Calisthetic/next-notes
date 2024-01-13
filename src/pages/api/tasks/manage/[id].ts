import { Task } from '@/src/lib/api-classes/task';
import { getId } from '@/src/lib/get-id';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'PATCH') {
      res.status(405).send({message: 'Only PATCH requests are allowed'})
    }
    const { id } = req.query
    if (!id || Array.isArray(id)) {
      return res.status(400).send({message: 'Bad request'})
    }
    const userId = req.headers["user-id"]
    if (!userId) {
      return res.status(401).send({message: 'Unauthorized'})
    }
    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Tasks!A2:" + getSheetLetter(new Task([]))
    })
    if (!response.data.values) {
      return res.status(500).json({message: 'Something went wrong'})
    }
    const tasksData = response.data.values.filter(x => x.length > 0 && x[1] === userId && x[0] === id)
    if (tasksData && tasksData.length !== 1) {
      return res.status(404).json({message: 'Task not found'})
    }
    let currentTask = tasksData[0]
    currentTask[4] = currentTask[4] === "1" ? "0" : "1"
    const rowId = response.data.values.findIndex(x => x[0] === id) + 2
    
    const response2 = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Tasks!A" + rowId + ":" + getSheetLetter(new Task([])) + rowId,
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
      message: 'Task updated'
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}