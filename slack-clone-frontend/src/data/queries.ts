import gql from 'graphql-tag';
import { createMembershipTemplateQuery } from '../utils';
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
  query SidebarQuery($user: String!) {
    Chanel(where: { Memberships: { userId: { _eq: $user } } }) {
      id
      name
      Memberships {
        userId
        direct
        id
        User {
          status
          username
        }
      }
      Memberships_aggregate {
        aggregate {
          count
        }
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
      Memberships_aggregate {
        aggregate {
          count
        }
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

export const checkMembership = (usersId: string[]) => gql`
  query ExistingMembership {
    Chanel(
      where: {
        _and: [
          {Memberships: {direct: {_eq: true}}},
          ${createMembershipTemplateQuery(usersId).join(',')}
        ]
      }
    ) {
      id
      name
    }
  }
`;

export const searchMessages = gql`
  query SearchMessageQuery($query: String!, $filters: String) {
    Search(query: $query, filters: $filters) {
      hits {
        id
        body
        date
        userId
        channelId
        _highlightResult {
          body {
            matchLevel
            value
          }
        }
      }
    }
  }
`;
