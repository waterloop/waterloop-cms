import * as actionTypes from '../action-types';
const initialState = {
  id: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case actionTypes.USER_SET_ID:
      return {
        ...state,
        id: payload.id
      }

    default:
      return state
  }
}
