// tslint:disable:no-any
import {Request, Response, NextFunction} from "express"
import {jsonifyError} from "@alphab/utils"

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  const statusCode: number = res.statusCode || 500
  req.error = Object.assign({}, {statusCode}, {err: jsonifyError(err)})
  res.status(statusCode)
  res.json(req.error)
}
