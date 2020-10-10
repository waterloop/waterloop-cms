import * as actionTypes from '../action-types';

export const setUserId = (userId) => ({
  type: actionTypes.USER_SET_ID,
  payload: {
    id: userId,
  },
});
