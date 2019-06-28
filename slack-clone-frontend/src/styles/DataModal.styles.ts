import styled from 'styled-components';

export const DataItem = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid ${props => props.theme.borderColorLight};
  box-sizing: border-box;
  cursor: pointer;
`;

export const DataContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 200px);
  min-height: 0;
  transition: all 0.5 ease-in;
  overflow-y: auto;
  ${DataItem}:last-child {
    border-bottom: 1px solid ${props => props.theme.borderColorLight};
  }
`;
