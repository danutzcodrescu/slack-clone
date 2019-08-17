import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25rem;
  }
`;

export const DateHeader = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 1rem 0;
  text-transform: capitalize;
`;

export const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

export const DateSpan = styled.span`
  color: darkgrey;
`;
