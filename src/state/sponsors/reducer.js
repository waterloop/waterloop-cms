import * as actionTypes from '../action-types';

const initialState = {
  allSponsors: [],
  allTiers: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SPONSORS_SET_SPONSORS:
      return {
        ...state,
        allSponsors: payload.sponsors,
      };

    case actionTypes.SPONSORS_SET_SPONSOR_TIERS:
      return {
        ...state,
        allTiers: payload.sponsorTiers,
      }

    default:
      return { ...state };
  }
};
