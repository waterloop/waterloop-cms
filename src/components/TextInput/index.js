import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
`;

const TextInputContainer = styled.input`
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 10px;
  height: 47px;
  width: 100%;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font: ${({ theme }) => theme.fonts.medium18};
    line-height: 47px;
    color: ${({ theme }) => theme.colours.greys.grey2};
  }
`;

const TextAreaContainer = styled.textarea`
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font: ${({ theme }) => theme.fonts.medium18};
    color: ${({ theme }) => theme.colours.greys.grey2};

  }
`;

const TextInput = ({
  className, /* Allows for external styles to be applied to the component
                using the styled components library
                className prop needs to be passed to the parent JSX element */
  multiLine = false,
  value, /* The current value of the input */
  onChange, /* Callback to be called each time that the user changes the input */
  rows = 10,
  placeholder = 'Place Holder Text',
}) => (
  <Container className={className}>
    { multiLine ? (
      <TextAreaContainer
        rows={rows}
        cols="60"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <TextInputContainer
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </Container>
);

export default TextInput;
