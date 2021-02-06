import React from 'react';
import styled from 'styled-components';

const Title = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const FormContainer = ({ title, children }) => (
  <OuterContainer>
    <Title>{title}</Title>
    {children}
  </OuterContainer>
);

export default FormContainer;
