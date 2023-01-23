import * as actionTypes from '../action-types';

const initialState = {
  allGeeseFeatures: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GEESE_FEATURES_SET_GEESE_FEATURES:
      return {
        ...state,
        allGeeseFeatures: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
