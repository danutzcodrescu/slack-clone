import React from 'react';
import { Layout } from './components/Layout';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { StoreContextProvider } from 'store/store';

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
    <StoreContextProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Layout />
        </div>
      </ApolloProvider>
    </StoreContextProvider>
  );
};

export default App;
