import * as fs from "fs"
import * as path from "path"
import {Request, Response} from "express"
import {ApiException} from "@alphab/domain"
import {askWit} from "@alphab/client"

export const callback = async (req: Request, res: Response) => {
  if (!(req.body && Object.keys(req.body).length)) {
    throw new ApiException(res, "No Content", 204)
  }
  console.log("req", req.body)

  // channel_id, response_url, user_id, user_name
  const {command, text} = req.body
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
      try {
        // await slackClient.sendTyping(msg.channel)
        const result = await require(`./intents/${intent.value}.ts`).default(
          message,
          answer,
        )
        res.json(result)

        // await slackClient.sendMessage(answer, msg.channel)
      } catch (e) {
        // await slackClient.sendMessage(e.message, msg.channel)
        console.log(e)
        res.json(e)
      }
    }
  }
}

export default {
  callback,
}
