/* tslint:disable:no-any */
import * as request from "superagent"
import "./config"

const SLACK_API =
  process.env.SLACK_API || "https://slack.com/api/chat.postMessage"
const SLACK_TOKEN = process.env.SLACK_TOKEN || "na"

export const postSlackMessage = async (
  message: any,
  intent: string,
  channel: string,
) => {
  const from = bots[intent]

  console.log({
    as_user: false,
    channel,
    ...from,
    ...message,
  })

  await request
    .post(SLACK_API)
    .send({
      as_user: false,
      channel,
      ...from,
      ...message,
    })
    .set("Content-type", "application/json")
    .set("Authorization", `Bearer ${SLACK_TOKEN}`)
}

const bots = {
  time: {
    icon_url:
      "https://avatars.slack-edge.com/" +
      "2019-03-13/576333305558_e1b91af1ebb6edec4259_512.jpg",
    username: "time-traveler",
  },
  weather: {
    icon_url:
      "https://avatars.slack-edge.com/" +
      "2019-03-13/575966567447_edb6513e0993f42548e0_48.png",
    username: "weather-man",
  },
}
