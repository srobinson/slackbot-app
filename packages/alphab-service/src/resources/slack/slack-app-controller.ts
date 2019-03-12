import {Request, Response} from "express"

export const callback = async (req: Request, res: Response) => {
  console.log("req", req.body)
  console.log("-------------")
  console.log("req", req)

  res.json({
    OK: true,
  })
}

export default {
  callback,
}
