import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';
import { useHistory } from 'react-router';

const dateStringsToDate = (data) => ({
  ...data,
  deadline: new Date(data.deadline),
  lastUpdated: new Date(data.lastUpdated),
});

const dateStringsToDates = R.map(dateStringsToDate);
const usePostings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postings = useSelector(postingSelectors.postings);
  const getPostings = useCallback(
    async () => {
      try {
        const response = await api.postings.getPostings(); 
        if (response.data[0].hasOwnProperty('team')) { //checking the first element for team in object (if there is, it will be in the rest of them)
          return dateStringsToDates( 
            response
              .data
              .map(
                (item) => ({
                  ...item
                }),
              ),
          );
        }
        else {
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
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
        throw err;
      }
    }, [],
  );

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

  const updatePostingClosed = useCallback(async (id, closedState) => {
    const boolClosedState = closedState === '1';
    try {
      const response = await api
        .postings
        .patchPosting({ closed: boolClosedState }, id);

      if (response.status === 200) {
        console.log('closedState', closedState);
        dispatch(postingActions.updateClosedState(id, boolClosedState));
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }
    }
  }, [dispatch]);

  const addPosting = useCallback(() => {
    api.postings
      .createNewPosting()
      .then((response) => {
        if (typeof response.data[0] === 'number') {
          history.push(`/postings/${response.data[0]}`);
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
      });
  }, [history]);

  return {
    postings,
    updatePostingClosed,
    addPosting,
  };
};

export default usePostings;
