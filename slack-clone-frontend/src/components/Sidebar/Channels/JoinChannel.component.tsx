import * as React from 'react';
import { Modal } from 'components/Modal/Modal.component';
import { Form } from 'styles/ModalButtons';
import { Query, QueryResult, Mutation, MutationFn } from 'react-apollo';
import { allChannelsQuery } from 'data/queries';
import styled from 'styled-components';
import { Input } from 'styles/Input.styles';
import { debounce } from 'lodash';
import { StoreContext, Actions } from 'store/store';
import { joinChannel } from 'data/mutations';
import { DataContainer, DataItem } from 'styles/DataModal.styles';
import { Channel } from 'components/Channels';

interface Props {
  exitCallback: () => void;
}

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

export function JoinChannel(props: Props) {
  const { user, dispatch } = React.useContext(StoreContext);
  const refectchRef = React.useRef<Function>();
  const createMembershipRef = React.useRef<MutationFn>();
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    (refectchRef as any).current({ channelName: `%${e.target.value}%` });
  }, 300);

  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };

  function selectChannel(
    channel: { id: string; name: string; members: number },
    memberships: { userId: string }[]
  ) {
    if (memberships.some(membership => membership.userId === user)) {
      dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
    } else {
      (createMembershipRef as any)
        .current({ variables: { channelId: channel.id, userId: user } })
        .then((resp: any) => {
          const channelAffiliation =
            resp.data.insert_Membership.returning[0].Chanel;
          dispatch({
            type: Actions.SELECTED_CHANNEL,
            payload: channelAffiliation
          });
        });
    }
    props.exitCallback();
  }
  return (
    <Modal close={props.exitCallback} title="Browse channels">
      <>
        <Form>
          <SearchInput
            name="channelName"
            id="channelName"
            placeholder="Search channels"
            onChange={filterChannels}
          />
        </Form>
        <Mutation mutation={joinChannel}>
          {(createMembershipFn: MutationFn) => {
            createMembershipRef.current = createMembershipFn;
            return (
              <Query query={allChannelsQuery} variables={{ channelName: '%%' }}>
                {({ loading, error, data, refetch }: QueryResult) => {
                  refectchRef.current = refetch;
                  if (loading) {
                    return <p>loading</p>;
                  }

                  return (
                    <>
                      <DataContainer>
                        {data.Chanel.map((channel: Channel) => (
                          <DataItem
                            key={channel.id}
                            onClick={() =>
                              selectChannel(
                                {
                                  id: channel.id,
                                  name: channel.name,
                                  members:
                                    channel.Memberships_aggregate.aggregate
                                      .count
                                },
                                channel.Memberships
                              )
                            }
                          >
                            # {channel.name}
                          </DataItem>
                        ))}
                      </DataContainer>
                    </>
                  );
                }}
              </Query>
            );
          }}
        </Mutation>
      </>
    </Modal>
  );
}