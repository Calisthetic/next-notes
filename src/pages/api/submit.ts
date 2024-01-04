import getSheetClient from '@/src/lib/sheet-client';
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from "next"

type SheetForm = {
  name:string
  birthday:Date
  description?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== 'POST') {
  //   res.status(405).send({message: 'Only POST requests are allowed'})
  // }

  // function updateSheet(spreadsheetId, range, values) {
  //   gapi.client.sheets.spreadsheets.values.update({
  //     spreadsheetId: spreadsheetId,
  //     range: range,
  //     valueInputOption: 'USER_ENTERED',
  //     resource: {
  //       values: values
  //     }
  //   }).then((response) => {
  //     console.log('Updated range: ' + response.updatedRange);
  //   }, (reason) => {
  //     console.error('Error: ' + reason.result.error.message);
  //   });
  // }

  const body = req.body as SheetForm

  try {
    const auth = await google.auth.getClient({
      // credentials: {
      //   client_email: process.env.GOOGLE_CLIENT_EMAIL,
      //   private_key: process.env.GOOGLE_PRIVATE_KEY?.replace('/\\n/g', '\n')
      // },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
      ]
    })


    const sheets = await getSheetClient();
    // google.sheets({
    //   version: "v4",
    //   auth
    // })
    
    // const response = await sheets.spreadsheets.values.append({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //   range: "A1:C1",
    //   valueInputOption: "USER_ENTERED",
    //   requestBody: {
    //     values: [
    //       [body.name, body.birthday, body.description]
    //     ]
    //   }
    // })

    // const response = await sheets.spreadsheets.get({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID
    // })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Users!A2:C"
    })
    
    // const response = await sheets.spreadsheets.get({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //   auth: auth
    // })

    return res.status(200).json({
      data: response.data
    })
  } catch(e:any) {
    return res.status(500).send({message: e.message ?? 'Something went wrong'})
  }
}