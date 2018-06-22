const gql = require("graphql-tag");
const { AWSAppSyncClient } = require("aws-appsync");
const createAppSync = require("@conduitvc/appsync-emulator-serverless/jest");
global.fetch = require("node-fetch");

describe("graphql", () => {
  const appsync = createAppSync();

  it("None & Lambda examples", async () => {
    const cognito = await appsync.client.query({
      query: gql`
        query info {
          lambda {
            test
          }
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
        },
        lambda: {
          test: 'yup',
        }
      },
      loading: false,
      stale: false
    });
  });

  it ('subscription / mutation / dynamodb', async () => {
    const sub = await appsync.client.subscribe({
      query: gql`
        subscription sub {
          subscribeToPutQuoteRequest {
            id
            commodity
            amount
          }
        }
      `,
    });

    const waiting = new Promise(accept => sub.subscribe(accept));
    await appsync.client.mutate({
      mutation: gql`
        mutation test($input: QuoteRequestInput!) {
          putQuoteRequest(input: $input) {
            id
            commodity
            amount
          }
        }
      `,
      variables: {
        input: {
          commodity: 'foo',
          amount: 100.5,
        },
      },
    });

    const event = await waiting;
    expect(event).toMatchObject({
      data: {
        subscribeToPutQuoteRequest: {
          amount: 100.5,
          commodity: 'foo',
        },
      },
    });
  })
});
