import styled from 'styled-components';

export const colors = [
  'RebeccaPurple',
  'Teal',
  'Navy',
  'MediumPurple',
  'MediumSeaGreen'
];

export const UserTag = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  margin-top: 0.3rem;
  color: white;
  border-radius: 0.5rem;
  position: relative;
`;

export const UserDeleteTag = styled.span.attrs({
  role: 'button'
})`
  color: white;
  font-size: 1.2rem;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 9;
  cursor: pointer;
`;
