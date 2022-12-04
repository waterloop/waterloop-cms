import * as actionTypes from '../action-types';

const initialState = {
  allBlogInfo: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BLOG_INFO:
      return {
        ...state,
        allBlogInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
