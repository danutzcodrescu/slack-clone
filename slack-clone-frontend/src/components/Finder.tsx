import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { StoreContext } from 'store/store';
import styled from 'styled-components';
import { CreateChannelMutation, CreateMembership } from '../data/mutations';
import { CreateChannel } from '../generated/CreateChannel';

interface Props {
  exitCallback: () => void;
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 100%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: inherit;
  i {
    width: 100%;
  }
  &:hover {
    background-color: lightgrey;
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
  return (
    <Container>
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
                  <input
                    name="channelName"
                    id="channelName"
                    placeholder="eg leads"
                  />
                  <button onClick={props.exitCallback}>Cancel</button>
                  <button type="submit">Create</button>
                </Form>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    </Container>
  );
}
