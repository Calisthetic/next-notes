import { Task } from '@/src/lib/api-classes/task';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.status(405).send({message: 'Only GET requests are allowed'})
    }
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
      range: "Tasks!A2:" + getSheetLetter(new Task([]))
    })
    if (!response.data.values) {
      return res.status(200).json({data: []})
    }
    let tasksData = response.data.values.filter(x => x.length > 0 && x[1] === userId)
    tasksData.sort((a, b) => {
      const aYear = parseInt(a[2][6] + a[2][7])
      const bYear = parseInt(b[2][6] + b[2][7])
      if (aYear === bYear) {
        const aMonth = parseInt(a[2][3] + a[2][4])
        const bMonth = parseInt(b[2][3] + b[2][4])
        if (aMonth === bMonth) {
          const aDay = parseInt(a[2][0] + a[2][1])
          const bDay = parseInt(b[2][0] + b[2][1])
          return aDay - bDay
        }
        return aMonth - bMonth
      }
      return aYear - bYear
    })
    
    return res.status(200).json({
      data: tasksData.slice(0, tasksData.length > parseInt(count) ? parseInt(count) : tasksData.length)
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}