import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import styled from 'styled-components';
import { submitMessageMutation } from '../data/mutations';
import { StoreContext } from '../store/store';

const SubmitButton = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-left: 3px solid darkgrey;
  position: fixed;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1rem;
  right: 27px;
  bottom: 13px;
  cursor: pointer;
`;

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
    & + ${SubmitButton} {
      border-left: 3px solid DimGray;
    }
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

export function InputMessage() {
  const { selectedChannel, user } = React.useContext(StoreContext);
  return (
    <Mutation mutation={submitMessageMutation}>
      {(submitMessage: MutationFn) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            submitMessage({
              variables: {
                userId: user,
                channelId: selectedChannel!.id,
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
