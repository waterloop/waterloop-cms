import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const FormContainer = ({ title, children, className }) => (
  <OuterContainer className={className}>
    <Title>{title}</Title>
    {children}
  </OuterContainer>
);

export default FormContainer;

FormContainer.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};
