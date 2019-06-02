import gql from 'graphql-tag';
export const messageQuery = gql`
  query MessageQuery($channelId: uuid) {
    Mesage(where: { channelId: { _eq: $channelId } }) {
      id
      body
      date
      User {
        username
      }
    }
  }
`;

export const membershipQuery = gql`
  query SidebarQuery {
    Membership(where: { userId: { _eq: "user1" } }) {
      id
      direct
      Chanel {
        id
        name
      }
    }
  }
`;
