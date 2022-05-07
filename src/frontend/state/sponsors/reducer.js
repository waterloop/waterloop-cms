import * as actionTypes from '../action-types';

const initialState = {
  allSponsors: [],
  allSponsorDesc: null,
  allTiers: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SPONSORS_SET_SPONSORS:
      return {
        ...state,
        allSponsors: payload.sponsors,
      };

    case actionTypes.SPONSORS_SET_SPONSOR_DESC:
      return {
        ...state,
        allSponsorDesc: payload.sponsorDesc,
      }

    case actionTypes.SPONSORS_SET_SPONSOR_TIERS:
      return {
        ...state,
        allTiers: payload.sponsorTiers,
      }

    default:
      return { ...state };
  }
};
