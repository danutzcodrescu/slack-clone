import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StoreContextProvider } from 'store/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import { Layout } from './components/Layout';

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-access-key': process.env.REACT_APP_HASURA_ADMIN_SECRET
      }
    }
  }
});

const httpLink = new HttpLink({
  uri: `https://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  headers: {
    'x-hasura-access-key': process.env.REACT_APP_HASURA_ADMIN_SECRET
  }
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
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

const App: React.FC = () => {
  return (
    <StoreContextProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Layout />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    </StoreContextProvider>
  );
};

export default App;
