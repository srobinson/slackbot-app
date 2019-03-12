import * as express from "express"
import * as bodyParser from "body-parser"
// import * as cors from "cors"
import {
  enhanceRequestMiddleware,
  errorHandlerMiddleware,
  logRequestMiddleware,
} from "@alphab/logging"
import Routes from "./routes"
import "express-async-errors"
import "./config"

class Express {
  public static config(): express.Application {
    const app: express.Application = express()

    app
      .set("port", process.env.WIKI_SERVICE_PORT)
      // .use(cors())
      .use(bodyParser.urlencoded({extended: false}))
      .use(bodyParser.json())
      // .use(express.static("public"))
      .use(enhanceRequestMiddleware)
      .use(logRequestMiddleware)
      .use("/api", Routes.api())
      .use(errorHandlerMiddleware)

    return app
  }
}

export default Express.config()
