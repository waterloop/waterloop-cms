/* eslint-disable no-unused-vars */
/* remove before merge  ^^^ */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  height: 0;
  width: 500px;
`;

const TextInputContainer = styled.input`
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 10px;
  height: 47px;
  width: 100%;
  background-color: ${({ theme }) => theme.colours.white};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font: ${({ theme }) => theme.fonts.medium18};
    color: ${({ theme }) => theme.colours.greys.grey2};
  }
`;

const TitleText = styled.div`
  font: ${({ theme }) => theme.fonts.bold18};
  color: ${({ theme }) => theme.colours.black};
  margin-bottom: 12px;
`;

const TextInput = ({
  className, /* Allows for external styles to be applied to the component using the styled components library
                className prop needs to be passed to the parent JSX element */
  value, /* The current value of the input */
  onChange, /* Callback to be called each time that the user changes the input */

  /* Add other props here */
}) => {
  /* Boolean flag to be used when implimenting the multi-line update */
  const [ multiLine, setMultiLine ] = useState(false)
  return (
    <>
      <TitleText>
        Title Info
      </TitleText>
      <Container>
        <TextInputContainer placeholder="Placeholder Text, Change it">    
        </TextInputContainer>
      </Container>
    </>
  );
};

export default TextInput;
