import * as actionTypes from '../action-types';

const initialState = {
  allProductVariationsInfo: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_VARIATIONS_SET_VARIATION:
      return {
        ...state,
        allProductVariationsInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
