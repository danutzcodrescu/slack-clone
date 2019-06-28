import gql from 'graphql-tag';

export const CreateChannelMutation = gql`
  mutation CreateChannel($name: String) {
    insert_Chanel(objects: { name: $name, group: "" }) {
      returning {
        id
      }
    }
  }
`;

export const CreateMembership = gql`
  mutation CreateMembership($userId: String, $channelId: uuid) {
    insert_Membership(objects: { userId: $userId, channelId: $channelId }) {
      returning {
        id
      }
    }
  }
`;

export const submitMessageMutation = gql`
  mutation SubmitMessage($userId: String!, $body: String, $channelId: uuid!) {
    insert_Mesage(
      objects: { userId: $userId, body: $body, channelId: $channelId }
    ) {
      returning {
        userId
        id
        body
        channelId
      }
    }
  }
`;

export const joinChannel = gql`
  mutation JoinChannel($userId: String!, $channelId: uuid!) {
    insert_Membership(
      objects: { channelId: $channelId, userId: $userId, direct: false }
    ) {
      returning {
        id
        Chanel {
          id
          name
        }
      }
    }
  }
`;

export const createDMChannel = gql`
  mutation CreateDMChannel($user1: String!, $user2: String!, $title: String) {
    insert_Chanel(
      objects: {
        name: $title
        group: ""
        Memberships: {
          data: [
            { userId: $user1, direct: true }
            { userId: $user2, direct: true }
          ]
        }
      }
    ) {
      returning {
        id
        name
      }
    }
  }
`;
