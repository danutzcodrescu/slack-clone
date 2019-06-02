import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import styled from 'styled-components';
import { submitMessageMutation } from '../data/mutations';
import { StoreContext } from '../store/store';

const SubmitButton = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-left: ${props => `3px solid ${props.theme.borderColorDark}`};
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
  border: 3px solid ${props => props.theme.borderColorDark};
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid ${props => props.theme.hoverBorderColor};
    & + ${SubmitButton} {
      border-left: 3px solid ${props => props.theme.hoverBorderColor};
    }
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

export function InputMessage() {
  const { selectedChannel, user } = React.useContext(StoreContext);
  const [inputValue, setInputValue] = React.useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
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
            onChange={onChangeInput}
          />
          <SubmitButton disabled={inputValue === ''} type="submit">
            <i className="fas fa-arrow-alt-circle-right" />
          </SubmitButton>
        </form>
      )}
    </Mutation>
  );
}
