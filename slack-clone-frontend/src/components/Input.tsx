import * as React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid darkgrey;
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid DimGray;
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

const SubmitButton = styled.button`
  border-radius: 7px;
  outline: none;
  background-color: white;
  border: none;
  border-left: 3px solid darkgrey;
  position: fixed;
  box-sizing: border-box;
  padding: 1.125rem;
  right: 27px;
  bottom: 15px;
  cursor: pointer;
`;

const submitMessageMutation = gql`
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

export function InputMessage() {
  return (
    <Mutation mutation={submitMessageMutation}>
      {(submitMessage: any, { data }: any) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            submitMessage({
              variables: {
                userId: 'user1',
                channelId: 'b6def4f9-d92c-4e75-840e-9412876c04a4',
                body: (e.target as any).message.value
              }
            });
            (e.target as any).reset();
          }}
        >
          <InputStyle
            name="message"
            type="text"
            placeholder="Message John Doe"
          />
          <SubmitButton type="submit">
            <i className="fas fa-arrow-alt-circle-right" />
          </SubmitButton>
        </form>
      )}
    </Mutation>
  );
}
