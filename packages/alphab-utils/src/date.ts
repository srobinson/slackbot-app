import * as moment from "moment"


export const timeFromDateString = (date: string) => moment(date).format("LT")

export const timeFromTimeStamp = (ts: number) => moment(ts * 1000).format("LT")

