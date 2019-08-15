import * as React from 'react';
import styled from 'styled-components';
import { Actions, StoreContext } from '../store/store';
import { Item } from '../styles/SidebarItem.styles';
import { Channel, Membership } from './Channels';
import { JoinDmComponent } from './Sidebar/DMs/JoinDm.component';
import { Status } from './Sidebar/Channels/Status.component';

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2 {
    font-size: 1rem;
  }
`;

const MembersCount = styled.span`
  padding: 3px;
  background-color: ${props => props.theme.backgroundColorGrey};
  color: ${props => props.theme.textColorDark};
  margin-right: calc(0.4rem - 1px);
  border-radius: 80%;
`;

interface DirectMessageProps {
  channels: Channel[];
}

export function DirectMessages({ channels }: DirectMessageProps) {
  const { user, dispatch } = React.useContext(StoreContext);
  const [isJoinDM, setDMModal] = React.useState<boolean>(false);

  const selectChannel = (channel: {
    id: string;
    name: string;
    members: number;
  }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };
  function DMTitles(channel: Channel) {
    return channel.Memberships.reduce(
      (acc, value: Membership) => {
        if (value.userId !== user.id) {
          return [...acc, value.userId];
        }
        return acc;
      },
      [] as string[]
    ).join(' - ');
  }
  return (
    <>
      {isJoinDM ? (
        <JoinDmComponent exitCallback={() => setDMModal(false)} />
      ) : null}
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" onClick={() => setDMModal(true)} />
      </MessagesTitles>
      <ul>
        {channels.map(channel => {
          let status: 'online' | 'offline';
          if (channel.Memberships.length === 2) {
            status = (channel.Memberships.find(
              membership => membership.userId !== user.id
            )! as any).User.status;
          }
          return (
            <Item
              onClick={() =>
                selectChannel({
                  id: channel.id,
                  name: channel.name,
                  members: channel.Memberships_aggregate.aggregate.count
                })
              }
              key={channel.id}
            >
              {channel.Memberships.length === 2 ? (
                <Status status={status!} />
              ) : (
                <MembersCount>{channel.Memberships.length - 1}</MembersCount>
              )}{' '}
              {DMTitles(channel)}
            </Item>
          );
        })}
      </ul>
    </>
  );
}
