import * as actionTypes from '../action-types';

export const setUserId = (userId) => ({
  type: actionTypes.USER_SET_ID,
  payload: {
    id: userId,
  },
});

export const setUserPicture = (picture) => ({
  type: actionTypes.USER_SET_PICTURE,
  payload: {
    picture,
  },
});
