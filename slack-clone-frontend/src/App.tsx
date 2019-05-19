import React from 'react';
import { Layout } from './components/Layout';

import { split, HttpLink, InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
  uri: `wss://slack-clone-hasura.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'https://slack-clone-hasura.herokuapp.com/v1/graphql'
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout />
      </div>
    </ApolloProvider>
  );
};

export default App;
