import { useCallback } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import * as userActions from '../state/user/actions';
import { useDispatch } from 'react-redux';
import api from '../api';
import Cookies from 'js-cookie';

const scopes = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/admin.directory.group.readonly',
];

const useGoogleAuth = (onAuthComplete) => {
  const dispatch = useDispatch();
  const onSuccess = useCallback(
    (response) => {
      // https://github.com/anthonyjgrove/react-google-login/blob/7db5b9686a70ded6b090a9c01906ca978b00a54d/index.d.ts#L29
      const { tokenId, profileObj, accessToken } = response;
      console.log('Begin auth');
      api.google
        .checkToken(tokenId, accessToken)
        .then((checkTokenResponse) => {
          if (checkTokenResponse.status === 200) {
            const { userId, groupIds, accessToken } = checkTokenResponse.data;
            onAuthComplete(null, {
              userId,
              tokenId,
              groupIds,
              accessToken,
            });
          }
        })
        .catch((err) => onAuthComplete(err));

      dispatch(userActions.setUserPicture(profileObj.imageUrl));
    },
    [onAuthComplete],
  );

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: (err) => {
      console.log('failed auth', err);
    },
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: scopes.join(' '),
    prompt: 'consent',
  });

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      // removeAllCookies();
      Cookies.remove('tokenId');
      console.log('successful logout');
    },
    onFailure: () => {
      console.error('Failed to logout!');
    },
  });

  return {
    signIn,
    signOut,
  };
};

export default useGoogleAuth;
