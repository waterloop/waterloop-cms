import React from 'react';
import styled from 'styled-components';

import { ReactComponent as BuildingsSVG } from './assets/buildings.svg';
import { ReactComponent as PodSVG } from './assets/pod.svg';
import UnstyledSignInBox from './components/SignInBox';

const SignInBox = styled(UnstyledSignInBox)`
  top: calc(min(20%, 267px));
  position: absolute;
  left: calc(min(84px, 5%))
`;

const Buildings = styled(BuildingsSVG)`
  width: auto;
  height: 75%;

  @media screen and (max-width:  ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }
`;

const Pod = styled(PodSVG)``;

const PodTrack = styled.div`
  background-color: ${({ theme }) => theme.colours.yellows.yellow1};
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width:  ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: center;
  }

  @media screen and (max-height:  655px) {
    display: none;
  }

  ${Pod} {
    margin-left: 20%;
    @media screen and (max-width:  ${({ theme }) => theme.breakpoints.md}px) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colours.blues.blue1};
  height: 100vh;
  width: 100vw;

  ${Buildings} {
    position: absolute;
    bottom: 32px;
    right: 48px;
  }

  ${PodTrack} {
    position: absolute;
    bottom: 120px;
  }
`;

const SignIn = () => {
  return (
    <Container>
      <SignInBox />
      <PodTrack>
        <Pod />
      </PodTrack>
      <Buildings />
    </Container>
  );
};

export default SignIn;
