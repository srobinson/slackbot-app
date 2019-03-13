/* tslint:disable:no-any */
import * as moment from "moment"
import {formatRegionName, geocode, timezone} from "@alphab/client"

const intent = async (msg: any, data: any) => {
  if (!data.location) {
    const time = moment(msg.timestamp).format("LT")
    return {
      text: `The time is ${time}`,
    }
  }
  const searchRegion = data.location[0].value
  const coords = await geocode(searchRegion)
  const region = formatRegionName(coords.display_name)
  const date = await timezone({
    lat: coords.lat,
    lng: coords.lon,
  })
  return formatTime(date.timestamp, region)
}

const formatTime = (timestamp: number, region: string) => {
  const time = moment(timestamp * 1000).format("LT")
  return {
    text: `The time in ${region} is ${time}`,
  }
}

export default intent
