import * as express from "express"
import * as bodyParser from "body-parser"
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
      .use(bodyParser.urlencoded({extended: false}))
      .use(bodyParser.json())
      .use(enhanceRequestMiddleware)
      .use(logRequestMiddleware)
      .use("/", Routes.roots())
      .use(errorHandlerMiddleware)

    return app
  }
}

export default Express.config()
