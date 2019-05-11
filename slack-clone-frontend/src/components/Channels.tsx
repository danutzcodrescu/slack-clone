import * as React from 'react';
import styled from 'styled-components';

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2 {
    font-size: 1rem;
  }
`;

const ChannelItem = styled.li`
  margin: 0.25rem 0;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export function Channels() {
  const channels = [
    'announcements',
    'general',
    'frontend',
    'backend',
    'random'
  ];
  return (
    <>
      <ChannelsTitles>
        <h2>Channels</h2>
        <i className="fas fa-plus" />
      </ChannelsTitles>
      <ul>
        {channels.map(channel => (
          <ChannelItem key={channel}># {channel}</ChannelItem>
        ))}
      </ul>

      <Button className="channel-button">
        {' '}
        <i className="fas fa-plus" /> Add channel
      </Button>
    </>
  );
}
