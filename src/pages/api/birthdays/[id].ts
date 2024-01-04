// export async function GET(
//   req: Request,
//   { params }: { params: { id: string }}
// ) {
//   const id = params.id
//   return id
// }

import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  res.end(`Post: ${id}`)
}