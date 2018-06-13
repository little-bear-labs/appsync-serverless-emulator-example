import gql from 'graphql-tag';
import React from 'react';
import { Query, Mutation, Subscription } from 'react-apollo';

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
    {(create, { data }) => (
      <button
        onClick={e => {
          e.preventDefault();
          create({ variables: { input: { commodity: 'foo', amount: 100 } } });
        }}
      >
        Create quote
      </button>
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
      defaultAuthStrategy
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
        </div>
        <div>
          <h1>Subscriptions</h1>
          <ListCommodities />
        </div>
      </div>
    );
  }
}
