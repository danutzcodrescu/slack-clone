import gql from 'graphql-tag';

export const messageSubscription = gql`
  subscription MessageSubscription($channelId: uuid) {
    Mesage(where: { channelId: { _eq: $channelId } }) {
      id
      date
      body
      User {
        username
      }
    }
  }
`;
