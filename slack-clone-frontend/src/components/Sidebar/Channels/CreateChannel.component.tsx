import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { StoreContext } from 'store/store';
import styled from 'styled-components';
import {
  CreateChannelMutation,
  CreateMembership
} from '../../../data/mutations';
import { CreateChannel } from '../../../generated/CreateChannel';
import { Modal } from '../../Modal/Modal.component';
import { Input } from 'styles/Input.styles';

interface Props {
  exitCallback: () => void;
}

const CloseButton = styled.button`
  background-color: white;
  border: 3px solid lightgrey;
  outline: none;
  border-radius: 1rem;
  color: dimgrey;
  padding: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  :hover {
    border: 3px solid dimgrey;
    color: black;
  }
`;

const SubmitButton = styled(CloseButton)`
  background-color: darkgreen;
  border: 3px solid black;
  color: white;
  :disabled {
    background-color: lightgrey;
    color: black;
    cursor: default;
  }
  &:not(:disabled):hover {
    color: white;
    border-color: 3px solid black;
  }
`;

const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    display: block;
    margin: 1rem 0;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`;

export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext);
  const [inputValue, setInputValue] = React.useState<string>('');
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  return (
    <Modal close={props.exitCallback} title="Create channel">
      <Mutation mutation={CreateMembership} update={() => props.exitCallback()}>
        {(createMembership: MutationFn) => (
          <Mutation
            mutation={CreateChannelMutation}
            onCompleted={(data: CreateChannel) => {
              createMembership({
                variables: {
                  channelId: data.insert_Chanel!.returning[0].id,
                  userId: user
                }
              });
            }}
          >
            {(createChannel: MutationFn) => (
              <>
                <Form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    createChannel({
                      variables: { name: e.target.channelName.value }
                    });
                    e.target.reset();
                  }}
                >
                  <label htmlFor="channelName">Name</label>
                  <Input
                    name="channelName"
                    id="channelName"
                    placeholder="eg leads"
                    onChange={onChangeInputValue}
                  />
                  <CloseButton onClick={props.exitCallback}>Cancel</CloseButton>
                  <SubmitButton disabled={inputValue === ''} type="submit">
                    Create
                  </SubmitButton>
                </Form>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    </Modal>
  );
}
