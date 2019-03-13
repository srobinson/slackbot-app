/* tslint:disable:no-any */
import {agent, SuperTest, Test, Response} from "supertest"
import App from "@alphab/service/src/index"

const request: SuperTest<Test> = agent(App)

export async function GetResourceResponse(
  url: string,
  method: string = "get",
  payload?: any,
): Promise<Response> {
  const response = await request[method](url).send(payload)
  return response
}

export async function ResourceOKTest(url: string, method: string = "get") {
  const response = await GetResourceResponse(url, method)
  expect(response.status).toBe(200)
}

export async function ResourceNotFoundTest(
  url: string,
  method: string = "get",
) {
  const response = await GetResourceResponse(url, method)
  const errObject = {
    err: {
      message: `Resource ${url} was not found.`,
      name: "Error",
      stack: `Error: Resource ${url} was not found.`,
    },
    statusCode: 404,
  }
  const body = response.body
  expect(response.status).toBe(404)
  expect(body).toEqual(errObject)
}
