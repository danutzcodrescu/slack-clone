import * as React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid darkgrey;
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid DimGray;
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

export function InputMessage() {
  return <InputStyle type="text" placeholder="Message John Doe" />;
}
