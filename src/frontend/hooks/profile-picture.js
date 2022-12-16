import { useSelector } from 'react-redux';

import * as userSelectors from 'frontend/state/user/selectors';

const useProfilePicture = () => {
  const profilePicture = useSelector(userSelectors.picture);

  return {
    profilePicture,
  };
};

export default useProfilePicture;
