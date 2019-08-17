import * as React from 'react';
import { StoreContext } from 'store/store';
import {
  CreateChannelMutation,
  CreateMembership
} from '../../../data/mutations';
import { CreateChannel } from '../../../generated/CreateChannel';
import { Container } from 'components/MessageLayout/MessageBox.style';
import { ExitButtonContainer, ButtonClose, Form } from './Finder.styles';
import { useMutation } from '@apollo/react-hooks';

interface Props {
  exitCallback: () => void;
}

export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext);
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
  return (
    <Container>
      <>
        <ExitButtonContainer>
          <ButtonClose onClick={props.exitCallback}>
            <i className="far fa-times-circle" />
            esc
          </ButtonClose>
        </ExitButtonContainer>
        <h1>Create channel</h1>
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
          <input name="channelName" id="channelName" placeholder="eg leads" />
          <button onClick={props.exitCallback}>Cancel</button>
          <button type="submit">Create</button>
        </Form>
      </>
    </Container>
  );
}
