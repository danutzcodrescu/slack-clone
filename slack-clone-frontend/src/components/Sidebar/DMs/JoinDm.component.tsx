import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../../Modal/Modal.component';
import { Input } from 'styles/Input.styles';
import { CloseButton, SubmitButton, Form } from 'styles/ModalButtons';
import { Query, QueryResult, withApollo } from 'react-apollo';
import { allUsersQuery, checkMembership } from 'data/queries';
import { StoreContext, Actions } from 'store/store';
import { DataContainer, DataItem } from 'styles/DataModal.styles';
import { debounce, random } from 'lodash';
import ApolloClient from 'apollo-client';
import { createDMChannel } from 'data/mutations';

interface User {
  username: string;
  id: string;
  color: string;
}

const colors = [
  'RebeccaPurple',
  'Teal',
  'Navy',
  'MediumPurple',
  'MediumSeaGreen'
];

const UserTag = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  margin-top: 0.3rem;
  color: white;
  border-radius: 0.5rem;
  position: relative;
`;

const UserDeleteTag = styled.span.attrs({
  role: 'button'
})`
  color: white;
  font-size: 1.2rem;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 9;
  cursor: pointer;
`;

interface Props {
  exitCallback: () => void;
  client?: ApolloClient<any>;
}

export function JoinDM(props: Props) {
  const { user, dispatch } = React.useContext(StoreContext);
  const [selectedUsers, setSelectedUser] = React.useState<User[]>([]);
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };
  const refectchRef = React.useRef<Function>();
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    (refectchRef as any).current({
      currentUserId: user.id,
      filter: `%${e.target.value}%`
    });
  }, 300);

  function setMembership(users: User[]) {
    props
      .client!.query({
        query: checkMembership([user.id, ...users.map(user => user.id)])
      })
      .then((resp: any) => {
        if (resp.data.Chanel.length) {
          dispatch({
            type: Actions.SELECTED_CHANNEL,
            payload: resp.data.Chanel[0]
          });
        } else {
          props
            .client!.mutate({
              mutation: createDMChannel([
                user.id,
                ...users.map(user => user.id)
              ]),
              variables: {
                title: `${user.id}-${users.map(user => user.id).join('-')}`
              }
            })
            .then(resp => {
              dispatch({
                type: Actions.SELECTED_CHANNEL,
                payload: resp.data.insert_Chanel.returning[0]
              });
            });
        }
      })
      .finally(() => {
        props.exitCallback();
      });
  }
  return (
    <Modal close={props.exitCallback} title="Direct Messages">
      <>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            setMembership(selectedUsers);
            e.target.reset();
          }}
        >
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="eg leads"
            onChange={onChangeInputValue}
          />
          <CloseButton onClick={props.exitCallback}>Cancel</CloseButton>
          <SubmitButton type="submit">Join DM</SubmitButton>
        </Form>
        {selectedUsers.map(user => (
          <UserTag style={{ backgroundColor: user.color }} key={user.id}>
            {user.username}
            <UserDeleteTag
              onClick={() =>
                setSelectedUser((prevState: User[]) =>
                  prevState.filter(us => us.id !== user.id)
                )
              }
            >
              X
            </UserDeleteTag>
          </UserTag>
        ))}
        <Query
          query={allUsersQuery}
          variables={{ currentUserId: user.id, filter: '%' }}
        >
          {({ loading, error, data, refetch }: QueryResult) => {
            refectchRef.current = refetch;
            if (loading || !data) {
              return <p>loading</p>;
            }

            return (
              <>
                <DataContainer>
                  {data.User.map((user: { id: string; username: string }) => (
                    <DataItem
                      key={user.id}
                      onClick={() =>
                        setSelectedUser((prevState: User[]) => {
                          if (prevState.find(us => us.id === user.id)) {
                            return prevState;
                          }
                          return [
                            ...prevState,
                            { ...user, color: colors[random(0, 5)] }
                          ];
                        })
                      }
                    >
                      @ {user.username}
                    </DataItem>
                  ))}
                </DataContainer>
              </>
            );
          }}
        </Query>
      </>
    </Modal>
  );
}

export const JoinDmComponent = withApollo(JoinDM);
