import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';
import { useHistory } from 'react-router';

import { dateToLocalTime } from '../utils/datetime';

const dateStringsToDate = (data) => ({
  ...data,
  deadline: dateToLocalTime(new Date(data.deadline)), // Convert UTC to local time
  lastUpdated: dateToLocalTime(new Date(data.lastUpdated)),
});

const dateStringsToDates = R.map(dateStringsToDate);
const usePostings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postings = useSelector(postingSelectors.postings);
  const getPostings = useCallback(async () => {
    try {
      const joinTeamName = true;
      const response = await api.postings.getPostings(joinTeamName); //default boolean is false for joinTeamName, can just remove
      if (joinTeamName) {
        return dateStringsToDates(
          response.data.map((item) => ({
            ...item,
            team: item.teamName,
            teamName: undefined,
          })),
        );
      } else {
        const teams = await api.teams.getTeams();
        return dateStringsToDates(
          response.data.map((item) => ({
            ...item,
            team: teams.data.find((team) => team.id === item.teamId).teamName,
          })),
        );
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }
      throw err;
    }
  }, []);

  const load = useCallback(async () => {
    try {
      dispatch(postingActions.setPostings(await getPostings()));
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.log('Failed to load postings');
      }
    }
  }, [dispatch, getPostings]);

  useEffect(() => {
    load();
  }, [load]);

  const updatePostingClosed = useCallback(
    async (id, closedState) => {
      const boolClosedState = closedState === '1';
      try {
        const response = await api.postings.patchPosting(
          { closed: boolClosedState },
          id,
        );

        if (response.status === 200) {
          console.log('closedState', closedState);
          dispatch(postingActions.updateClosedState(id, boolClosedState));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
      }
    },
    [dispatch],
  );

  const addPosting = useCallback(() => {

      history.push(`/postings/-1`);
  }, [history]);

  return {
    postings,
    updatePostingClosed,
    addPosting,
  };
};

export default usePostings;
