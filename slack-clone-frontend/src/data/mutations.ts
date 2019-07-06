import gql from 'graphql-tag';
import { createMembershipTemplateMutation } from 'utils';

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

export const createDMChannel = (userIds: string[]) => gql`
  mutation CreateDMChannel($title: String) {
    insert_Chanel(
      objects: {
        name: $title
        group: ""
        Memberships: {
          data: [
            ${createMembershipTemplateMutation(userIds).join(',')}
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
