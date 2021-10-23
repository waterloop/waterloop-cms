import * as actionTypes from '../action-types';

export const updateGeeseInfo = (geeseInfo) => ({
  type: actionTypes.GEESE_INFO_SET_GEESE_INFO,
  payload: geeseInfo,
});
