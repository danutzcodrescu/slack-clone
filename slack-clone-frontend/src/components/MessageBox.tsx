import * as React from 'react';
import styled from 'styled-components';
import { Query, Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const messageQuery = gql`
  {
    Mesage(
      where: { channelId: { _eq: "b6def4f9-d92c-4e75-840e-9412876c04a4" } }
    ) {
      id
      body
      date
      User {
        username
      }
    }
  }
`;

const messageSubscription = gql`
  subscription {
    Mesage(
      where: { channelId: { _eq: "b6def4f9-d92c-4e75-840e-9412876c04a4" } }
    ) {
      id
      date
      body
      User {
        username
      }
    }
  }
`;

const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25rem;
  }
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgrey;
`;

interface Message {
  id: string;
  body: string;
  date: string;
  User: {
    username: string;
  };
}

export function MessageBox() {
  const messageListRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    );
  }, [messageListRef]);

  const subscription = (subscribeToMore: any) => {
    subscribeToMore({
      document: messageSubscription,
      updateQuery: (prev: Message[], { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        return subscriptionData.data;
      }
    });
  };

  return (
    <Query query={messageQuery}>
      {({ loading, error, data, subscribeToMore }: any) => {
        subscription(subscribeToMore);
        return (
          <Container ref={messageListRef}>
            <ul>
              {!loading && data.Mesage
                ? (data.Mesage as Message[]).map((message, index) => {
                    return (
                      <li key={message.id}>
                        <Username>{message.User.username}</Username>
                        <DateSpan>
                          {/* {new Intl.DateTimeFormat('en-GB').format(new Date(message.date))} */}
                          {message.date}
                        </DateSpan>
                        <p>{message.body}</p>
                      </li>
                    );
                  })
                : null}
            </ul>
          </Container>
        );
      }}
    </Query>
  );
}
