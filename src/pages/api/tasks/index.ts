import { Task } from '@/src/lib/api-classes/task';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
      return res.status(500).send({message: 'Something went wrong'})
    }

    let tasksData = response.data.values.filter(x => x.length > 0 && x[1] === userId)
    tasksData.sort((a, b) => {
      let aYear = parseInt(a[3][6] + a[3][7])
      let bYear = parseInt(b[3][6] + b[3][7])
      if (aYear === bYear) {
        let aMonth = parseInt(a[3][3] + a[3][4])
        let bMonth = parseInt(b[3][3] + b[3][4])
        if (aMonth === bMonth) {
          let aDay = parseInt(a[3][0] + a[3][1])
          let bDay = parseInt(b[3][0] + b[3][1])
          return aDay - bDay
        }
        return aMonth - bMonth
      }
      return aYear - bYear
    })
    tasksData.sort((a, b) => {
      let aCompleted = parseInt(a[5])
      let bCompleted = parseInt(b[5])
      return aCompleted - bCompleted
    })
    return res.status(200).json({
      data: tasksData
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}