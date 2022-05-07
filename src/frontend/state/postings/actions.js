import * as actionTypes from '../action-types';

export const setPostings = (postings) => ({
  type: actionTypes.POSTINGS_SET_POSTINGS,
  payload: {
    postings,
  },
});

export const setPostingById = (id, posting) => ({
  type: actionTypes.POSTINGS_SET_POSTING_BY_ID,
  payload: {
    id, posting,
  },
});

export const updateClosedState = (id, closedState) => ({
  type: actionTypes.POSTINGS_UPDATE_CLOSED_STATE,
  payload: {
    id,
    closedState,
  },
});
