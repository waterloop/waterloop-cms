import * as actionTypes from '../action-types';

const initialState = {
  allGeeseInfo: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GEESE_INFO_SET_GEESE_INFO:
      return {
        ...state,
        allGeeseInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
