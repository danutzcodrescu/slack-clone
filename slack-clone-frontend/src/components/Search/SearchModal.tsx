import * as React from 'react';
import styled from 'styled-components';
import { Paper, Modal, TextField } from '@material-ui/core';
import Downshift from 'downshift';
import { useApolloClient } from '@apollo/react-hooks';
import { searchMessages } from 'data/queries';
import { Suggestion } from './Suggestion';

interface Props {
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
}

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledPaper = styled(Paper)`
  width: 80%;
  padding: 3rem 1.5rem;
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' }
];

export function SearchModal({ isOpen, toggleModal }: Props) {
  return (
    <StyledModal
      aria-labelledby="search-title"
      aria-describedby="search-description"
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <StyledPaper>
        <Downshift
          onChange={selection =>
            alert(
              selection
                ? `You selected ${selection.value}`
                : 'Selection Cleared'
            )
          }
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <StyledTextField
                variant="outlined"
                placeholder="Search for messages inside conversations"
                label="Search"
                InputLabelProps={{
                  ...getLabelProps()
                }}
                InputProps={{
                  ...getInputProps()
                }}
              />
              <ul {...getMenuProps()}>
                {isOpen && inputValue ? (
                  <Suggestion
                    value={inputValue}
                    highlightedIndex={highlightedIndex}
                    selectedItem={selectedItem}
                  />
                ) : null}
              </ul>
            </div>
          )}
        </Downshift>
      </StyledPaper>
    </StyledModal>
  );
}
