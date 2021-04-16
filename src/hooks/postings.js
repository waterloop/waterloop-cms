import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';

const dateStringsToDate = (data) => ({
  ...data,
  deadline: new Date(data.deadline),
  lastUpdated: new Date(data.lastUpdated),
});

const dateStringsToDates = R.map(dateStringsToDate);

const usePostings = () => {
  const dispatch = useDispatch();
  const postings = useSelector(postingSelectors.postings);
  const getPostings = useCallback(
    async () => {
      try {
        const response = await api.postings.getPostings();
        const teams = await api.teams.getTeams();
        return dateStringsToDates(
          response
            .data
            .map(
              (item) => ({
                ...item,
                team: teams.data.find((team) => team.id === item.teamId).teamName,
              }),
            ),
        );
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
        throw err;
      }
    }, [],
  );

  const reload = useCallback(async () => {
    dispatch(postingActions.setPostings(await getPostings()));
  }, [dispatch, getPostings]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    postings,
    reload,
  };
};

export default usePostings;
