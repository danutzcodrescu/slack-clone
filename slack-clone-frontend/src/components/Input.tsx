import * as React from 'react';
import styled from 'styled-components';
import { submitMessageMutation } from '../data/mutations';
import { StoreContext } from '../store/store';
import { useMutation } from '@apollo/react-hooks';

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
  const [submitMessage] = useMutation(submitMessageMutation);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  let message: string;
  if (selectedChannel && selectedChannel.name) {
    switch (true) {
      case !selectedChannel.direct: {
        message = `# ${selectedChannel.name}`;
        break;
      }
      case selectedChannel.direct && selectedChannel.members === 2: {
        message = `${selectedChannel.name.replace(
          new RegExp(`(${user.username}|-)`, 'gi'),
          ''
        )}`;
        break;
      }
      default: {
        const users = selectedChannel.name
          .split('-')
          .filter(username => username !== user.username);
        message = users.join(', ');
      }
    }
  }
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submitMessage({
          variables: {
            userId: user.id,
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
        placeholder={`Message ${message!}`}
        onChange={onChangeInput}
      />
      <SubmitButton disabled={inputValue === ''} type="submit">
        <i className="fas fa-arrow-alt-circle-right" />
      </SubmitButton>
    </form>
  );
}
