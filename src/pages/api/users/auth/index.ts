import { User } from "@/src/lib/api-classes/user";
import getSheetClient from "@/src/lib/sheet-client";
import { getSheetLetter } from "@/src/lib/sheet-letters";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { login, password } = req.body;
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }
    if (!login || !password) {
      return res.status(400).send({ message: "Missing login or password" });
    }

    const sheets = await getSheetClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Users!A2:" + getSheetLetter(new User([]))
    })

    const filtered = response.data.values?.filter(x => x[3] === password && (x[1] === login || x[2] === login))
    if (!filtered || filtered.length === 0 ) {
      return res.status(401).send({message: 'Unauthorized'})
    }

    const userId = filtered[0][0]
    return res.status(200).json({
      data: userId
    })
  } catch (e: any) {
    return res.status(500).send({ message: e.message ?? "Something went wrong" });
  }
}
