import React from 'react';
import styled from 'styled-components';
import MUIButtonBase from '@material-ui/core/ButtonBase';
import MUITypography from '@material-ui/core/Typography';
import GoogleSVG from '../assets/GoogleIcon.svg';

const Typography = styled(MUITypography).attrs({
  variant: 'inherit'
})``;

const Header = styled(Typography)`
  font: ${({ theme }) => theme.fonts.bold36};
  color: ${({ theme }) => theme.colours.blacks.black1};
`;

const Body = styled(Typography)`
  font: ${({ theme }) => theme.fonts.medium18};
  color: ${({ theme }) => theme.colours.blacks.black2};
`;

const GoogleLogo = styled.img.attrs({
  src: GoogleSVG
})``;

const Button = styled(MUIButtonBase)`
  width: 170px;
  height: 60px;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  font: ${({ theme }) => theme.fonts.medium24};
  color: ${({ theme }) => theme.colours.blacks.black1}


  ${GoogleLogo} {
    padding-right: 16px;
  }
`;

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colours.white};
  display: flex;
  flex-direction: column;
  width: 400px;


  ${Header} {
    padding-top: 45px;
    padding-left: 32px;
  }

  ${Body} {
    padding-top: 32px;
    padding-left: 32px;
  }

  ${Button} {
    margin-top: 40px;
    align-self: center;
    margin-bottom: 56px;
  }
`;

const SignInBox = ({ className, onClick }) => {
  return (
    <Container className={className}>
      <Header>Sign in</Header>
      <Body>Remember to use your waterloop email</Body>
      <Button onClick={onClick}>
        <GoogleLogo /> Sign In
      </Button>
    </Container>
  );
};

export default SignInBox;
