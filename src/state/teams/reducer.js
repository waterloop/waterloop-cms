import * as actionTypes from '../action-types';

const initialState = {
  all: [],
  byId: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TEAMS_SET_TEAMS:
      return {
        ...state,
        all: payload.teams,
      };

    default:
      return { ...state };
  }
};
