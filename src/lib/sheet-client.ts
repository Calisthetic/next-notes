import { google } from "googleapis"

export default async function getSheetClient()  {
  const auth = await google.auth.getClient({
    // credentials: {
    //   client_email: process.env.GOOGLE_CLIENT_EMAIL,
    //   private_key: process.env.GOOGLE_PRIVATE_KEY?.replace('/\\n/g', '\n')
    // },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  })


  const sheets = google.sheets({
    version: "v4",
    auth
  })

  return sheets
}