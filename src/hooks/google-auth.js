import { useCallback } from 'react';
import { useGoogleLogin } from 'react-google-login';
import * as userActions from '../state/user/actions';
import { useDispatch } from 'react-redux';
import api from '../api';

const useGoogleAuth = (onAuthComplete) => {
  const dispatch = useDispatch();
  const onSuccess = useCallback(
    (response) => {
      // https://github.com/anthonyjgrove/react-google-login/blob/7db5b9686a70ded6b090a9c01906ca978b00a54d/index.d.ts#L29
      const { tokenId, profileObj } = response;
      console.log('Begin auth');
      api
        .google
        .checkToken(tokenId)
        .then((checkTokenResponse) => {
          if (checkTokenResponse.status === 200) {
            const { userId } = checkTokenResponse.data;
            onAuthComplete(null, { userId, tokenId });
          }
        })
        .catch((err) => onAuthComplete(err));
        
        dispatch (userActions.setUserPicture(profileObj.imageUrl));
    },
    [onAuthComplete],
  );

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: (err) => { console.log('failed auth', err); },
    clientId: '538509890740-e3dai2feq6knjfdspqde5ogt2kme0chm.apps.googleusercontent.com',
    prompt: 'consent select_account',
  });

  return {
    signIn,
  };
};

export default useGoogleAuth;
