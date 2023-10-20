import * as actionTypes from '../action-types';

const initialState = {
  allProducts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS_SET_PRODUCT:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
