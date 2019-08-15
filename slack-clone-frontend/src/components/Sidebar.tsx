import * as React from 'react';
import { Query, QueryResult, withApollo } from 'react-apollo';
import styled from 'styled-components';
import { membershipQuery } from '../data/queries';
import { SidebarQuery } from '../generated/SidebarQuery';
import { Channel, Channels } from './Channels';
import { DirectMessages } from './DirectMessage';
import { membershipSubscription } from 'data/subscriptions';
import { StoreContext } from 'store/store';
import ApolloClient from 'apollo-client';
import { changeUserStatus } from 'data/mutations';
import { Status } from './Sidebar/Channels/Status.component';

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

interface Props {
  client?: ApolloClient<any>;
}

function SidebarComponent(props: Props) {
  const { user, auth0 } = React.useContext(StoreContext);
  React.useEffect(() => {
    if (user.id) {
      props
        .client!.mutate({
          mutation: changeUserStatus,
          variables: { userId: user.id, status: 'online' }
        })
        .then(resp => console.log('resp'));
    }
  }, [props.client, user]);
  const subscription = (subscribeToMore: any) => {
    subscribeToMore({
      // variables: { channelId: selectedChannel!.id },
      document: membershipSubscription,
      updateQuery: (prev: SidebarQuery[], { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, subscriptionData.data);
      }
    });
  };
  async function logout() {
    await props.client!.mutate({
      mutation: changeUserStatus,
      variables: { userId: user.id, status: 'offline' }
    });
    localStorage.removeItem('token');
    auth0!.logout();
  }
  if (!user.id) {
    return <div></div>;
  }
  return (
    <Query query={membershipQuery} variables={{ user: user.id }}>
      {({ loading, error, data, subscribeToMore }: QueryResult) => {
        subscription(subscribeToMore);
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
      }}
    </Query>
  );
}

export const Sidebar = withApollo(SidebarComponent);
