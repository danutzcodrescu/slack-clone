import * as React from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  width: 100vw;
  height: 100vh;
`;

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <MainContent />
    </Container>
  );
}
