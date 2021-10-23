import { useCallback } from 'react';
import { useGoogleLogin } from 'react-google-login';
import api from '../api';

const useGoogleAuth = (onAuthComplete) => {
    const onSuccess = useCallback(
        (response) => {
            // https://github.com/anthonyjgrove/react-google-login/blob/7db5b9686a70ded6b090a9c01906ca978b00a54d/index.d.ts#L29
            const { tokenId, accessToken } = response;
            console.log('Begin auth');
            api.google
                .checkToken(tokenId, accessToken)
                .then((checkTokenResponse) => {
                    if (checkTokenResponse.status === 200) {
                        const {
                            userId,
                            groupIds,
                            accessToken,
                        } = checkTokenResponse.data;
                        onAuthComplete(null, {
                            userId,
                            tokenId,
                            groupIds,
                            accessToken,
                        });
                    }
                })
                .catch((err) => onAuthComplete(err));
        },
        [onAuthComplete],
    );

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure: (err) => {
            console.log('failed auth', err);
        },
        clientId:
            '538509890740-e3dai2feq6knjfdspqde5ogt2kme0chm.apps.googleusercontent.com',
        scope:
            'profile email https://www.googleapis.com/auth/admin.directory.group.readonly',
        prompt: 'consent',
    });

    return {
        signIn,
    };
};

export default useGoogleAuth;
