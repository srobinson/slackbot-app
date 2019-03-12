import {Router, Request, Response} from "express"
import {ResourceNotFoundException} from "@alphab/domain"
import {slackAppController as sc} from "./resources"

export default class Routes {
  public static api() {
    const api: Router = Router()

    api
      .get("/", (_, res: Response) => {
        res.json({
          status: "OK",
        })
      })

      .post("/callback", sc.callback)

      .get("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return api
  }
}
