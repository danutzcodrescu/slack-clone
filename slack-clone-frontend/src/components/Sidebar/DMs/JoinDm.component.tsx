import * as React from 'react';
import { Modal } from '../../Modal/Modal.component';
import { Input } from 'styles/Input.styles';
import { CloseButton, SubmitButton, Form } from 'styles/ModalButtons';
import { allUsersQuery, checkMembership } from 'data/queries';
import { StoreContext, Actions } from 'store/store';
import { DataContainer, DataItem } from 'styles/DataModal.styles';
import { debounce, random } from 'lodash';
import { createDMChannel } from 'data/mutations';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { UserTag, UserDeleteTag, colors } from './JoinDm.styles';

interface User {
  username: string;
  id: string;
  color: string;
}

interface Props {
  exitCallback: () => void;
}

export function JoinDM(props: Props) {
  const { user, dispatch } = React.useContext(StoreContext);
  const [selectedUsers, setSelectedUser] = React.useState<User[]>([]);
  const { data, loading, refetch } = useQuery(allUsersQuery, {
    variables: { currentUserId: user.id, filter: '%' }
  });
  const client = useApolloClient();
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({
      currentUserId: user.id,
      filter: `%${e.target.value}%`
    });
  }, 300);

  function setMembership(users: User[]) {
    client
      .query({
        query: checkMembership([user.id, ...users.map(user => user.id)])
      })
      .then((resp: any) => {
        if (resp.data.Chanel.length) {
          dispatch({
            type: Actions.SELECTED_CHANNEL,
            payload: { ...resp.data.Chanel[0], direct: true }
          });
        } else {
          client
            .mutate({
              mutation: createDMChannel([
                user.id,
                ...users.map(user => user.id)
              ]),
              variables: {
                title: `${user.id}-${users.map(user => user.id).join('-')}`
              }
            })
            .then(resp => {
              console.log(resp);
              dispatch({
                type: Actions.SELECTED_CHANNEL,
                payload: {
                  ...resp.data.insert_Chanel.returning[0],
                  direct: true
                }
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
        {loading || !data ? (
          <p>loading</p>
        ) : (
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
        )}
      </>
    </Modal>
  );
}
