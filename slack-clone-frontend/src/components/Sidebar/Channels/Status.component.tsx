import * as React from 'react';
import styled from 'styled-components';

const StatusIcon = styled.span<Props>`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  box-sizing: border-box;
  background-color: ${props =>
    props.status === 'online' ? 'green' : 'transparent'};
  border: ${props => (props.status !== 'online' ? '2px solid darkgrey' : 0)};
  margin-right: 0.5rem;
  display: inline-block;
`;

interface Props {
  status: 'online' | 'offline';
}

export function Status(props: Props) {
  return <StatusIcon status={props.status} />;
}
