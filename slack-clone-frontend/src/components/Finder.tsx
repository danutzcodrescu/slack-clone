import * as React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import {
  CreateChannel_insert_Chanel_returning,
  CreateChannel
} from 'generated/CreateChannel';
import { StoreContext } from 'store/store';

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

const CreateChannelMutation = gql`
  mutation CreateChannel($name: String) {
    insert_Chanel(objects: { name: $name, group: "" }) {
      returning {
        id
      }
    }
  }
`;

const CreateMembership = gql`
  mutation CreateMembership($userId: String, $channelId: uuid) {
    insert_Membership(objects: { userId: $userId, channelId: $channelId }) {
      returning {
        id
      }
    }
  }
`;

export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext);
  return (
    <Container>
      <Mutation mutation={CreateMembership} update={() => props.exitCallback()}>
        {(createMembership: any, { data }: any) => (
          <Mutation
            mutation={CreateChannelMutation}
            update={(cache: any, data: any) => {
              createMembership({
                variables: {
                  channelId: data.data.insert_Chanel.returning[0].id,
                  userId: user
                }
              });
            }}
          >
            {(createChannel: any, { data }: any) => (
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
