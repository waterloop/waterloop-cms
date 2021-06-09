import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import DeleteIcon from './assets/delete.svg';

const ButtonBase = styled.button`
  font: ${({ theme }) => theme.fonts.bold18};
  border: none;
  border-radius: 15px;
  padding: 4px 22px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  width: max-content;
  
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colours.yellows.yellow1};
  color: ${({ theme }) => theme.colours.blacks.black3};
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colours.blacks.black3};
  color: ${({ theme }) => theme.colours.yellows.yellow1};

`;

const CancelButton = styled(ButtonBase)`
  background-color: white;
  font: ${({ theme }) => theme.fonts.medium18};
  border: none;
  text-decoration: underline;
`;

const DeleteButton = styled(ButtonBase)`
  background-color: white;
  font: ${({ theme }) => theme.fonts.medium18};
  border: ${({ theme }) => theme.borders.solidGrey1};

  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    background: url(${DeleteIcon}) no-repeat;
    width: 20px;
    height: 20px;
    padding-right: 8px;
    content: "";
    display: inline-flex;
  }
`;

const getButtonComponent = (secondary, cancel, del) => {
  if (secondary) {
    return SecondaryButton;
  } if (cancel) {
    return CancelButton;
  } if (del) {
    return DeleteButton;
  }
  return PrimaryButton;
};

// Only set one flag (secondary, cancel or del);
const Button = ({
  label,
  secondary = false,
  cancel = false,
  del = false,
  onClick,
  link = false,
  to,
  className,
  children,
  disabled = false,
}) => {
  const ButtonComponent = getButtonComponent(secondary, cancel, del);
  const buttonText = label === undefined ? children : label;
  const history = useHistory();
  return link
    ? (
      /* Used to use react-router Link Component, but it made styles very repetitive */
      <ButtonComponent className={className} disabled={disabled} onClick={() => { history.push(to); }}>
        {buttonText}
      </ButtonComponent>
    )
    : (
      <ButtonComponent className={className} disabled={disabled} onClick={onClick}> {buttonText} </ButtonComponent>
    );
};

export default Button;
