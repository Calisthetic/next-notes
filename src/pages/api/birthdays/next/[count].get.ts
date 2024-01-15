import { Birthday } from '@/src/lib/api-classes/birthday';
import getSheetClient from '@/src/lib/sheet-client';
import { getSheetLetter } from '@/src/lib/sheet-letters';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetBirthdays(
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
      range: "Birthdays!A2:" + getSheetLetter(new Birthday([]))
    })
    if (!response.data.values) {
      return res.status(200).json({
        data: []
      })
    }
    let usersData = response.data.values.filter(x => x.length > 0 && x[1] === userId)
    usersData.sort((a, b) => {
      let aMonth = parseInt(a[3][3] + a[3][4])
      let bMonth = parseInt(b[3][3] + b[3][4])
      if (aMonth === bMonth) {
        let aDay = parseInt(a[3][0] + a[3][1])
        let bDay = parseInt(b[3][0] + b[3][1])
        return aDay - bDay
      }
      return aMonth - bMonth
    })
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    let startIndex = -1

    for (let i = 0; i < usersData.length; i++) {
      let month = parseInt(usersData[i][3][3] + usersData[i][3][4])
      let day = parseInt(usersData[i][3][1] + usersData[i][3][2])
      if ((month < currentMonth || (month === currentMonth && day <= currentDay))) {
        startIndex = i + 1
      }
    }
    if (startIndex === -1) {
      startIndex = 0
    }

    let pushBack = 0
    if (startIndex + parseInt(count) > usersData.length) {
      pushBack = startIndex + parseInt(count) - usersData.length
    }
    for (let i = 0; i < pushBack; i++) {
      usersData.push(usersData[i])
    }
    
    return res.status(200).json({
      data: usersData.slice(startIndex, startIndex + parseInt(count))
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}