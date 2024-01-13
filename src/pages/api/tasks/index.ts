import { NextApiRequest, NextApiResponse } from "next"
import GetTasks from "./index.get";
import CreateTask from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTasks(req, res);
      break;
    case 'POST':
      CreateTask(req, res);
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}