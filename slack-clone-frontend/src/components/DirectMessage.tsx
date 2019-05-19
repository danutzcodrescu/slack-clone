import * as React from 'react';
import styled from 'styled-components';
import { Status } from './Sidebar';
import { Channel } from './Channels';

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

const MessageItem = styled.li`
  margin: 0.25rem 0;
`;

interface DirectMessageProps {
  channels: Channel[];
}

export function DirectMessages({ channels }: DirectMessageProps) {
  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" />
      </MessagesTitles>
      <ul>
        {channels.map(channel => (
          <MessageItem key={channel.id}>
            <Status /> {channel.name}
          </MessageItem>
        ))}
      </ul>
    </>
  );
}
