import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import Roundtrip from './Roundtrip';

const client = new AWSAppSyncClient({
  url: 'http://localhost:62222/graphql',
  // url:
  //   'https://2dr36dk5sjelxeqtcbrvztvoyi.appsync-api.us-east-1.amazonaws.com/graphql',
  region: 'us-east-1',
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

console.log('>>> START');
Amplify.configure({
  Auth: {
    userPoolId: 'us-east-1_27WcML9k8',
    userPoolWebClientId: 'q4ppu404sdiqlcjg21756hvap',
    region: 'us-east-1',
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Roundtrip />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default withAuthenticator(App);
