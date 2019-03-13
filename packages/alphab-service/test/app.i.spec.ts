import {
  GetResourceResponse,
  ResourceNotFoundTest,
  ResourceOKTest,
} from "./_helpers/supertest"

xdescribe("GET 200/", () => {
  it("should return 200 OK", async () => {
    await ResourceOKTest("/")
    await ResourceOKTest("/api")
  })
})

xdescribe("GET /404", () => {
  it("should return 404", async () => {
    await ResourceNotFoundTest("/random-url")
    await ResourceNotFoundTest("/api/random-url")
    // await ResourceNotFoundTest("/api/callback", "post")
  })
})

xdescribe("POST /api/callback", () => {
  it("should throw if no body", async () => {
    const response = await GetResourceResponse("/api/callback", "post")
    expect(response.status).toBe(204)
  })
})

describe("POST /api/callback", () => {
  it("should tell the weather", async () => {
    const response = await GetResourceResponse("/api/callback", "post", {
      channel_id: "DF98QD020",
      channel_name: "directmessage",
      command: "/temp",
      response_url:
        "https://hooks.slack.com/commands/" +
        "TF98QCR7E/575921257030/fqPrkqE9oVQBT029nTSU1eqb",
      team_domain: "alphabio-workspace",
      team_id: "TF98QCR7E",
      text: "Austin",
      token: "IVCV0JVUaFMEeOjTCYYKoulQ",
      trigger_id: "574448334964.519296433252.8ee1ead81f23106bea0684718ee953eb",
      user_id: "UFAF7DYB1",
      user_name: "stuart",
    })

    expect(response.status).toBe(200)
    console.log("response", response.body)
  })
})
