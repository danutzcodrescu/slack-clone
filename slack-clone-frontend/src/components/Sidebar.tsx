import * as React from 'react';
import styled from 'styled-components';
import { membershipQuery } from '../data/queries';
import { SidebarQuery } from '../generated/SidebarQuery';
import { Channel, Channels } from './Channels';
import { DirectMessages } from './DirectMessage';
import { membershipSubscription } from 'data/subscriptions';
import { StoreContext } from 'store/store';
import { changeUserStatus } from 'data/mutations';
import { Status } from './Sidebar/Channels/Status.component';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';

const SidebarContainer = styled.div`
  height: 100%;
  background: rebeccapurple;
  padding: 1rem;
  color: white;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  font-size: 1.2rem;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 1.3rem;
`;

const UsernameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.5rem;
`;

export function Sidebar() {
  const { user, auth0 } = React.useContext(StoreContext);
  const [execute, { loading, data, subscribeToMore }] = useLazyQuery(
    membershipQuery,
    { variables: { user: user.id } }
  );
  const client = useApolloClient();

  React.useEffect(() => {
    window.addEventListener('beforeunload', logoutFromServer);
    return () => window.removeEventListener('beforeunload', logoutFromServer);
  }, [logoutFromServer]);

  React.useEffect(() => {
    if (user.id) {
      client
        .mutate({
          mutation: changeUserStatus,
          variables: { userId: user.id, status: 'online' }
        })
        .then(resp => console.log('resp'));

      execute();
    }
  }, [client, user, execute]);

  React.useEffect(() => {
    let subscription: any;
    if (user.id && subscribeToMore) {
      subscription = subscribeToMore({
        variables: { user: user.id },
        document: membershipSubscription,
        updateQuery: (prev: SidebarQuery[], { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, subscriptionData.data);
        }
      });
    }
    return () => subscription && subscription();
  }, [user, subscribeToMore]);
  async function logout() {
    await logoutFromServer();
    auth0!.logout();
  }

  async function logoutFromServer() {
    await client.mutate({
      mutation: changeUserStatus,
      variables: { userId: user.id, status: 'offline' }
    });
    localStorage.removeItem('token');
  }
  return (
    <SidebarContainer>
      <Header>
        <H1>Slack clone</H1>
        <div>
          <i className="far fa-bell" />
           
        </div>
        <UsernameContainer>
          <Status status="online" />
          {user.username}
          <button onClick={logout}>Log out</button>
        </UsernameContainer>
      </Header>
      {!loading && data && data.Chanel ? (
        <>
          <Channels
            channels={(data.Chanel as Channel[]).filter(
              chanel => !chanel.Memberships[0].direct
            )}
          />
          <DirectMessages
            channels={(data.Chanel as Channel[]).reduce(
              (acc, value) => {
                if (value.Memberships[0].direct) {
                  return [...acc, value];
                }

                return acc;
              },
              [] as Channel[]
            )}
          />
        </>
      ) : null}
    </SidebarContainer>
  );
}
