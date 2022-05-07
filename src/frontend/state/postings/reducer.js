import * as actionTypes from '../action-types';

const initialState = {
  all: [],
  byId: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.POSTINGS_SET_POSTINGS:
      return {
        ...state,
        all: payload.postings,
      };

    case actionTypes.POSTINGS_SET_POSTING_BY_ID:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: payload.posting,
        },
      };

    case actionTypes.POSTINGS_UPDATE_CLOSED_STATE:
      return {
        ...state,
        all: state.all.map((value) => {
          if (value.id === payload.id) {
            console.log(value);
          }
          return (
            value.id === payload.id
              ? { ...value, closed: payload.closedState }
              : value
          );
        }),
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            closed: payload.closedState,
          },
        },
      };
    default:
      return { ...state };
  }
};
