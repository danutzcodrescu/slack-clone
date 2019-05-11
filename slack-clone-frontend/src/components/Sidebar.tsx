import * as React from 'react';
import styled from 'styled-components';
import { Channels } from './Channels';
import { DirectMessages } from './DirectMessage';

const SidebarContainer = styled.div`
  height: 100%;
  background: rebeccapurple;
  padding: 1rem;
  color: white;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  font-size: 1.2rem;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 1.3rem;
`;

const UsernameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.5rem;
`;

export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.5rem;
  display: inline-block;
`;

export function Sidebar() {
  return (
    <SidebarContainer>
      <Header>
        <H1>Slack clone</H1>
        <div>
          <i className="far fa-bell" />
           
        </div>
        <UsernameContainer>
          <Status />
          John Doe
        </UsernameContainer>
      </Header>
      <Channels />
      <DirectMessages />
    </SidebarContainer>
  );
}
