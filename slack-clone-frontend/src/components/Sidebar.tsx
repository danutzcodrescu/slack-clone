import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { membershipQuery } from '../data/queries';
import { SidebarQuery } from '../generated/SidebarQuery';
import { Channel, Channels } from './Channels';
import { DirectMessages } from './DirectMessage';
import { membershipSubscription } from 'data/subscriptions';
import { StoreContext } from 'store/store';

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

export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.5rem;
  display: inline-block;
`;

export function Sidebar() {
  const { user, auth0 } = React.useContext(StoreContext);
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
                <Status />
                {user.username}
                <button onClick={() => auth0!.logout()}>Log out</button>
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
