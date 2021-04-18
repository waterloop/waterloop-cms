import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
  color: ${({ theme }) => theme.colours.blues.blue1};
  margin-left: 10px;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1284px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
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
