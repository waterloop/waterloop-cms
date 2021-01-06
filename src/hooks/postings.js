import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';

const deadlineToDate = (data) => ({
  ...data,
  deadline: new Date(data.deadline),
});

const deadlinesToDates = R.map(deadlineToDate);

const usePostings = () => {
  const dispatch = useDispatch();
  const postings = useSelector(postingSelectors.postings);
  const getPostings = useCallback(
    async () => {
      try {
        const response = await api.getPostings();
        return deadlinesToDates(response.data);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
        throw err;
      }
    }, [],
  );

  useEffect(() => {
    (async () => {
      dispatch(postingActions.setPostings(await getPostings()));
    })();
  }, [dispatch, getPostings]);

  return {
    postings,
  };
};

export default usePostings;
