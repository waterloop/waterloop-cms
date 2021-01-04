import React from 'react';
import styled from 'styled-components';

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

const Button = ({
  label,
  secondary = false,
  onClick,
  link = false,
  to,
  className,
  children,
}) => {
  const ButtonComponent = secondary ? SecondaryButton : PrimaryButton;
  const LinkComponent = secondary ? SecondaryLink : PrimaryLink;
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
