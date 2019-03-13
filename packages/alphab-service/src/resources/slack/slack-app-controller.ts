import * as fs from "fs"
import * as path from "path"
import {Request, Response} from "express"
import {ApiException} from "@alphab/domain"
import {askWit, postSlackMessage} from "@alphab/client"

export const callback = async (req: Request, res: Response) => {
  if (!(req.body && Object.keys(req.body).length)) {
    throw new ApiException(res, "No Content", 204)
  }

  const {channel_id, command, text} = req.body
  const message = `${command.substr(1)} ${text}`

  // determine the intent
  const answer = await askWit(message)

  if (answer.intent) {
    const intent = answer.intent[0]
    const intentPath = path.resolve(
      __dirname,
      `../../intents/${intent.value}.ts`,
    )

    if (fs.existsSync(intentPath)) {
      let message
      try {
        res.status(200)
        message = await require(intentPath).default(req.body, answer)
      } catch (e) {
        message = {
          text: `${e.message}`,
        }
      } finally {
        postSlackMessage(message, intent.value, channel_id)
        res.end()
      }
    }
  }
}

export default {
  callback,
}
