import {Router, Request, Response} from "express"
import {ResourceNotFoundException} from "@alphab/domain"
import {slackAppController as sc} from "./resources"

export default class Routes {
  public static roots() {
    const router: Router = Router()
    router
      .get("/", (_, res: Response) => {
        res.json({
          status: "OK",
        })
      })

      .get("/api", (_, res: Response) => {
        res.json({
          resources: ["callback"],
        })
      })

      .post("/api/callback", sc.callback)

      .all("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return router
  }
}
