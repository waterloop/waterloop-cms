import React from 'react';
import styled from 'styled-components';
import DeleteIcon from './assets/delete.svg';

const ButtonBase = styled.button`
  font: ${({ theme }) => theme.fonts.bold18};
  border: none;
  border-radius: 15px;
  padding: 4px 22px;
  cursor: pointer;
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

const LinkBase = styled.a`
  font: ${({ theme }) => theme.fonts.bold18};
  border: none;
  border-radius: 15px;
  padding: 4px 22px;
  cursor: pointer;
  width: max-content;
`;

const PrimaryLink = styled(LinkBase)`
  background-color: #FED95A;
  color: #1A1A1A;
`;

const SecondaryLink = styled(LinkBase)`
  background-color: #1A1A1A;
  color: #FED95A;
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

const CancelLink = styled(ButtonBase)`
  background-color: white;
  font: ${({ theme }) => theme.fonts.medium18};
  border: none;
  text-decoration: underline;
`;

const DeleteLink = styled(ButtonBase)`
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

const getLinkComponent = (secondary, cancel, del) => {
  if (secondary) {
    return SecondaryLink;
  } if (cancel) {
    return CancelLink;
  } if (del) {
    return DeleteLink;
  }
  return PrimaryLink;
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
}) => {
  const ButtonComponent = getButtonComponent(secondary, cancel, del);
  const LinkComponent = getLinkComponent(secondary, cancel, del);
  const buttonText = label === undefined ? children : label;
  return link
    ? (
      <LinkComponent className={className} href={to}> {buttonText} </LinkComponent>
    )
    : (
      <ButtonComponent className={className} onClick={onClick}> {buttonText} </ButtonComponent>
    );
};

export default Button;
