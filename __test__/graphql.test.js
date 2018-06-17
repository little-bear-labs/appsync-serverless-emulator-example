const gql = require("graphql-tag");
const { AWSAppSyncClient } = require("aws-appsync");
const {
  create,
  connect
} = require("@conduitvc/appsync-emulator-serverless/tester");
global.fetch = require("node-fetch");

describe("graphql", () => {
  let server, client;
  beforeEach(async () => {
    server = await create();
    client = connect(
      server,
      AWSAppSyncClient
    );
  });

  afterEach(async () => server.close());

  it("Query.cognitoInfo", async () => {
    const cognito = await client.query({
      query: gql`
        query info {
          cognitoInfo {
            username
          }
        }
      `
    });

    expect(cognito).toMatchObject({
      data: {
        cognitoInfo: {
          username: "d9aeaadc-e677-4c65-9d69-a4d6f3a7df86",
          __typename: "CognitoInfo"
        }
      },
      loading: false,
      stale: false
    });
  });
});
