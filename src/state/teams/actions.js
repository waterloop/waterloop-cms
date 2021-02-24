import * as actionTypes from '../action-types';

export const setTeams = (teams) => ({
  type: actionTypes.TEAMS_SET_TEAMS,
  payload: {
    teams,
  },
});
