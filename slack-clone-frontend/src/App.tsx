import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreContextProvider } from 'store/store';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import { Layout } from './components/Layout';
import createAuth0Client from '@auth0/auth0-spa-js';
import config from './auth_config.json';
import { createBrowserHistory } from 'history';
import { setContext } from 'apollo-link-context';

const history = createBrowserHistory();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
});

const httpLink = new HttpLink({
  uri: `https://${process.env.REACT_APP_HASURA_ENDPOINT}`
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
  link: authLink.concat(link),
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
        history.replace('/');
      }
      const isAuthenticated = await auth0.isAuthenticated();
      if (!isAuthenticated) {
        auth0.loginWithRedirect({ redirect_uri: window.location.origin });
      } else {
        user = await auth0.getUser();
        const token = (auth0 as any).cache.cache[
          'default::openid profile email'
        ].id_token;
        localStorage.setItem('token', token);
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
