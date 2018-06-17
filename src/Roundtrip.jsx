import gql from "graphql-tag";
import React from "react";
import { Mutation, Query, Subscription } from "react-apollo";

const requestsGql = gql`
  subscription quoteRequest {
    subscribeToPutQuoteRequest {
      id
      commodity
      amount
    }
  }
`;

const ListCommodities = () => (
  <Subscription subscription={requestsGql}>
    {({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>}
  </Subscription>
);

const neverNotifySubGql = gql`
  subscription notify {
    neverNotify
  }
`
const ListNotify = () => (
  <Subscription subscription={neverNotifySubGql}>
    {({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>}
  </Subscription>
);

const batchCreateGql = gql`
  mutation create {
    batchPutQuotes(
      request: { amount: 500, commodity: "Bread" }
      response: { expires: 1, offer: "Foobar" }
    ) {
      request {
        id
        commodity
        amount
      }
      response {
        id
        expires
        offer
      }
    }
  }
`;

const BatchCreateQuoteRequest = () => (
  <Mutation mutation={batchCreateGql}>
    {(create, payload) => (
      <div>
        <button
          disabled={payload.loading}
          onClick={e => {
            e.preventDefault();
            create();
          }}
        >
          Create batch quote
        </button>
        <pre>
          BATCH OUT:
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    )}
  </Mutation>
);

const createGql = gql`
  mutation create($input: QuoteRequestInput!) {
    putQuoteRequest(input: $input) {
      id
      commodity
      amount
    }
  }
`;

const CreateQuoteRequest = () => (
  <Mutation mutation={createGql}>
    {(create, createOut) => (
      <div>
        <button
          disabled={createOut.loading}
          onClick={e => {
            e.preventDefault();
            create({ variables: { input: { commodity: "foo", amount: 100 } } });
          }}
        >
          Create quote
        </button>
        <pre>
          OUT:
          {JSON.stringify(createOut, null, 2)}
        </pre>
      </div>
    )}
  </Mutation>
);

const notifyGql = gql`
  mutation notify {
    neverNotify
  }
`
const CreateNotify = () => (
  <Mutation mutation={notifyGql}>
    {(create, createOut) => (
      <div>
        <button
          disabled={createOut.loading}
          onClick={e => {
            e.preventDefault();
            create();
          }}
        >
          Create notify
        </button>
        <pre>
          OUT:
          {JSON.stringify(createOut, null, 2)}
        </pre>
      </div>
    )}
  </Mutation>
);

const showCognito = gql`
  query cognito {
    cognitoInfo {
      sub
      issuer
      username
      sourceIp
      claims
      groups
    }
  }
`;

const ShowCognito = () => (
  <Query query={showCognito} cachePolicy="network-only">
    {({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>}
  </Query>
);

export default class Roundtrip extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Cognito</h1>
          <ShowCognito />
        </div>
        <div>
          <h1>Create quote request </h1>
          <CreateQuoteRequest />
          <BatchCreateQuoteRequest />
          <CreateNotify />
        </div>
        <div>
          <h1>Subscriptions</h1>
          <ListCommodities />
          <ListNotify />
        </div>
      </div>
    );
  }
}
