import { Task } from '@/src/lib/api-classes/task';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
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
      return res.status(200).json({
        data: []
      })
    }
    let tasksData = response.data.values.filter(x => x.length > 0 && x[1] === userId && x[5] !== '1')
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
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    let startIndex = -1

    for (let i = 0; i < tasksData.length; i++) {
      let month = parseInt(tasksData[i][3][3] + tasksData[i][3][4])
      let day = parseInt(tasksData[i][3][1] + tasksData[i][3][2])
      if ((month < currentMonth || (month === currentMonth && day <= currentDay))) {
        startIndex = i + 1
      }
    }
    if (startIndex === -1) {
      startIndex = 0
    }
    
    return res.status(200).json({
      data: tasksData.slice(startIndex, startIndex + parseInt(count))
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}