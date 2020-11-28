import * as actionTypes from '../action-types';
const initialState = {
  id: null,
  picture: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_SET_ID:
      return {
        ...state,
        id: payload.id,
      };

    case actionTypes.USER_SET_PICTURE:
      return {
        ...state,
        picture: payload.picture,
      };

    default:
      return state;
  }
};
