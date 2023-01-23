import * as actionTypes from '../action-types';

export const updateGeeseInfo = (geeseInfo) => ({
  type: actionTypes.GEESE_FEATURES_SET_GEESE_FEATURES,
  payload: geeseInfo,
});
