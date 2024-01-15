import { Birthday } from "@/src/lib/api-classes/birthday";
import getSheetClient from "@/src/lib/sheet-client";
import { getSheetLetter } from "@/src/lib/sheet-letters";
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetBirthdays(
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
      range: "Birthdays!A2:" + getSheetLetter(new Birthday([]))
    })
    if (!response.data.values) {
      return res.status(200).json({
        data: []
      })
    }
    let birthdaysData = response.data.values.filter(x => x.length > 0 && x[1] === userId)
    birthdaysData.sort((a, b) => {
      let aMonth = parseInt(a[3][3] + a[3][4])
      let bMonth = parseInt(b[3][3] + b[3][4])
      if (aMonth === bMonth) {
        let aDay = parseInt(a[3][0] + a[3][1])
        let bDay = parseInt(b[3][0] + b[3][1])
        return aDay - bDay
      }
      return aMonth - bMonth
    })
    
    return res.status(200).json({
      data: birthdaysData
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}