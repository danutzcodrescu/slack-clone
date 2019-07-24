import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StoreContextProvider, User } from 'store/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import { Layout } from './components/Layout';
import createAuth0Client from '@auth0/auth0-spa-js';
import config from './auth_config.json';

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-access-key':
          '1QYgLeZS7NWJmaqm!Gat83Lbj4f6Rk7rn&7iY1&%4I$N&E4N'
      }
    }
  }
});

const httpLink = new HttpLink({
  uri: `https://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  headers: {
    'x-hasura-access-key': '1QYgLeZS7NWJmaqm!Gat83Lbj4f6Rk7rn&7iY1&%4I$N&E4N'
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
      fetchPolicy: 'network-only',
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
  const [user, setUser] = React.useState<any>(null);
  React.useEffect(() => {
    createAuth0Client(config).then(async auth0 => {
      let user;
      if (window.location.search.includes('code=')) {
        await auth0.handleRedirectCallback();
        user = await auth0.getUser();
        setUser({ username: user.nickname, id: user.sub, auth0 });
      }
      const isAuthenticated = await auth0.isAuthenticated();
      if (!isAuthenticated) {
        auth0.loginWithRedirect({ redirect_uri: 'http://localhost:3000' });
      } else {
        user = await auth0.getUser();
        setUser({ username: user.nickname, id: user.sub, auth0 });
      }
    });
  }, []);

  return (
    <StoreContextProvider user={user}>
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
