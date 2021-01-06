import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as userSelectors from '../state/user/selectors';
import * as userActions from '../state/user/actions';

const useProfilePicture = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userSelectors.userId);
  const profilePicture = useSelector(userSelectors.picture);

  const getProfilePicture = useCallback(async () => {
    const response = await api.google.getPicture(userId);
    return response.data.picture;
  }, [userId]);

  useEffect(() => {
    (async () => {
      dispatch(userActions.setUserPicture(await getProfilePicture()));
    })();
  }, [dispatch, getProfilePicture]);

  return {
    profilePicture,
  };
};

export default useProfilePicture;
