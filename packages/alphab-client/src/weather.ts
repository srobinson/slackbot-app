/* tslint:disable:no-any */
import * as request from "superagent"
import {formatRegionName} from "./geocode"
import "./config"

const OPENWEATHERMAP_API = process.env.OPENWEATHERMAP_API
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

export const weather = async (location: any) => {
  const url = `${OPENWEATHERMAP_API}?APPID=${OPENWEATHERMAP_API_KEY}&lat=${
    location.lat
  }&lon=${location.lon}&units=metric`
  try {
    const response = await request.get(url)
    return response.body
  } catch (e) {
    console.log(e)
    const formattedRegion = formatRegionName(location.region_name)
    throw new Error(
      `I'm terribly sorry, ` +
        `I can't seem the find weather for ${formattedRegion}`,
    )
  }
}
