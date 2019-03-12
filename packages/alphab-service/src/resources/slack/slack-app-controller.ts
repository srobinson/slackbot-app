import {Request, Response} from "express"

export const callback = async (req: Request, res: Response) => {
  res.json({
    OK: true,
  })
}

export default {
  callback,
}
