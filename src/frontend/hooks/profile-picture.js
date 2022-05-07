import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as userSelectors from '../state/user/selectors';
import * as userActions from '../state/user/actions';

const useProfilePicture = () => {
  const profilePicture = useSelector(userSelectors.picture);

  return {
    profilePicture,
  };
};

export default useProfilePicture;
