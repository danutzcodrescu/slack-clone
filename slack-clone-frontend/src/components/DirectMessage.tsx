import * as React from 'react';
import styled from 'styled-components';
import { Status } from './Sidebar';

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

export function DirectMessages() {
  const channels = [
    'Bot',
    'Jane Doe',
    'Lance Amstrong',
    'Johny Depp',
    'Miley Cyrus'
  ];
  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" />
      </MessagesTitles>
      <ul>
        {channels.map(channel => (
          <MessageItem key={channel}>
            <Status /> {channel}
          </MessageItem>
        ))}
      </ul>
    </>
  );
}
