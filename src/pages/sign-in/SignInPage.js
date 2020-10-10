import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useGoogleAuth } from '@waterloop/cms-client-api';

import BuildingsSVG from './assets/buildings.svg';
import PodSVG from './assets/pod.svg';
import WaterloopCmsLogoSVG from './assets/waterloop-cms-logo.svg';
import UnstyledSignInBox from './components/SignInBox';

import * as userActions from '../../state/user/actions';

const WaterloopCmsLogo = styled.img.attrs({
  src: WaterloopCmsLogoSVG,
})`
  position: absolute;
  top: 20px;
  right: calc(min(48px, 2%));
  max-width: 96%;
`;

const Buildings = styled.img.attrs({
  src: BuildingsSVG,
})`
  width: auto;
  height: 75%;

  @media screen and (max-width:  ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }
`;

const Pod = styled.img.attrs({
  src: PodSVG,
})``;

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

const SignInBox = styled(UnstyledSignInBox)`
  top: calc(min(20%, 267px));
  position: absolute;
  left: calc(min(84px, 5%));
  max-width: 90%;
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
    bottom: calc(min(120px, 10%));
  }
`;

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onAuthComplete = useCallback(
    (err, userId) => {
      if (err) {
        console.log(err)
        return;
      }
      dispatch(userActions.setUserId(userId));
      history.push('/');
    }, [dispatch, history]
  );

  const { login } = useGoogleAuth(onAuthComplete);
  return (
    <Container>
      <WaterloopCmsLogo />
      <SignInBox onClick={login} />
      <PodTrack>
        <Pod />
      </PodTrack>
      <Buildings />
    </Container>
  );
};

export default SignInPage;
