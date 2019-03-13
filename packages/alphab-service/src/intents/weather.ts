/* tslint:disable:no-any */
import {formatRegionName, geocode, weather} from "@alphab/client"

const intent = async (msg: any, data: any) => {
  if (!msg.text) {
    return {
      text: "Sorry, you need to specify a region",
    }
  }

  const searchRegion = data.location[0].value
  const location = await geocode(searchRegion)
  const response = await weather(location)
  const formatedRegion = formatRegionName(location.display_name)
  return formatWeather(response, formatedRegion)
}

// tslint:disable:object-literal-sort-keys
const formatWeather = (data: any, region: string) => {
  const description = data.weather[0].description
  return {
    text: `Weather report for ${region}`,
    attachments: [
      {
        fields: [
          {
            title: `${Math.round(data.main.temp)}℃ ${description}`,
          },
        ],
      },
    ],
  }
}

export default intent
