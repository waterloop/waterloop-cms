import * as actionTypes from '../action-types';

const initialState = {
  allProductInfo: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS_SET_PRODUCT:
      return {
        ...state,
        allProductInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
