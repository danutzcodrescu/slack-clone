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

export const allChannelsQuery = gql`
  query ChannelsQuery($channelName: String) {
    Chanel(
      where: {
        name: { _ilike: $channelName }
        Memberships: { direct: { _eq: false } }
      }
    ) {
      id
      name
      Memberships {
        userId
      }
    }
  }
`;

export const allUsersQuery = gql`
  query UsersQuery($currentUserId: String, $filter: String) {
    User(
      where: { id: { _neq: $currentUserId }, username: { _ilike: $filter } }
    ) {
      id
      username
    }
  }
`;

export const checkMembership = gql`
  query ExistingMembership($user1: String, $user2: String) {
    Membership(
      where: {
        userId: { _eq: $user1 }
        direct: { _eq: true }
        Chanel: { Memberships: { userId: { _eq: $user2 } } }
      }
    ) {
      id
      Chanel {
        name
        id
      }
    }
  }
`;
