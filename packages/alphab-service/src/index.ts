/* tslint:disable:no-any */
import {logger} from "@alphab/logging"
import {jsonifyError} from "@alphab/utils"
// import {slackClient} from "./bot"
import App from "./app"
import "./config"

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

process.on("SIGINT", function() {
  process.exit()
})

// slackClient.start()

const PORT = process.env.SERVICE_PORT || "3001"

if (!module.parent) {
  App.listen(parseInt(PORT, 10), (err: object) => {
    if (err) {
      return logger.error(jsonifyError(err))
    }
    return logger.info(`😊 wiki-service listening on port [${PORT}]`)
  })
}

export default App