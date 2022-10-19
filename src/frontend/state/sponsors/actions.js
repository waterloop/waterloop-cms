import * as actionTypes from '../action-types';

export const setSponsors = (sponsors) => ({
  type: actionTypes.SPONSORS_SET_SPONSORS,
  payload: {
    sponsors,
  },
});

export const setSponsorDesc = (sponsorDesc) => ({
  type: actionTypes.SPONSORS_SET_SPONSOR_DESC,
  payload: {
    sponsorDesc,
  },
});

export const setSponsorTiers = (sponsorTiers) => ({
  type: actionTypes.SPONSORS_SET_SPONSOR_TIERS,
  payload: {
    sponsorTiers,
  },
});
