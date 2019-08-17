import * as React from 'react';
import { Modal } from 'components/Modal/Modal.component';
import { Form } from 'styles/ModalButtons';
import { allChannelsQuery } from 'data/queries';
import styled from 'styled-components';
import { Input } from 'styles/Input.styles';
import { debounce } from 'lodash';
import { StoreContext, Actions } from 'store/store';
import { joinChannel } from 'data/mutations';
import { DataContainer, DataItem } from 'styles/DataModal.styles';
import { Channel } from 'components/Channels';
import { useMutation, useQuery } from '@apollo/react-hooks';

interface Props {
  exitCallback: () => void;
}

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

export function JoinChannel(props: Props) {
  const { user, dispatch } = React.useContext(StoreContext);
  const [createMembership] = useMutation(joinChannel);
  const { data, loading, refetch } = useQuery(allChannelsQuery, {
    variables: { channelName: '%%' }
  });
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({ channelName: `%${e.target.value}%` });
  }, 300);

  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };

  function selectChannel(
    channel: { id: string; name: string; members: number },
    memberships: { userId: string }[]
  ) {
    if (memberships.some(membership => membership.userId === user.id)) {
      dispatch({
        type: Actions.SELECTED_CHANNEL,
        payload: { ...channel, direct: false }
      });
    } else {
      createMembership({
        variables: { channelId: channel.id, userId: user.id }
      }).then((resp: any) => {
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
        {loading ? (
          <p>loading</p>
        ) : (
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
                        members: channel.Memberships_aggregate.aggregate.count
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
        )}
      </>
    </Modal>
  );
}
