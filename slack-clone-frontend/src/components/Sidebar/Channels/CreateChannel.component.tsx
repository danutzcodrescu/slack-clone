import * as React from 'react';
import { StoreContext } from 'store/store';
import {
  CreateChannelMutation,
  CreateMembership
} from '../../../data/mutations';
import { CreateChannel } from '../../../generated/CreateChannel';
import { Modal } from '../../Modal/Modal.component';
import { Input } from 'styles/Input.styles';
import { CloseButton, SubmitButton, Form } from 'styles/ModalButtons';
import { useMutation } from '@apollo/react-hooks';

interface Props {
  exitCallback: () => void;
}

export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [createMembership] = useMutation(CreateMembership, {
    update: props.exitCallback
  });
  const [createChannel] = useMutation(CreateChannelMutation, {
    onCompleted: (data: CreateChannel) => {
      createMembership({
        variables: {
          channelId: data.insert_Chanel!.returning[0].id,
          userId: user.id
        }
      });
    }
  });
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  return (
    <Modal close={props.exitCallback} title="Create channel">
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
    </Modal>
  );
}
