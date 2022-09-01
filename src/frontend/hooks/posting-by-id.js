import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';

import { dateToLocalTime } from '../utils/datetime';

const dateStringsToDate = (data) => ({
  ...data,
  deadline: dateToLocalTime(new Date(data.deadline)), // Convert UTC to local time
  lastUpdated: dateToLocalTime(new Date(data.lastUpdated)),
});

const usePostingPostingById = (postingId) => {
  const dispatch = useDispatch();
  const posting = useSelector(postingSelectors.postingById(postingId));
  const getPostingById = useCallback(async () => {
    try {
      const response = await api.getPostingById(postingId);
      return dateStringsToDate(response.data);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      throw err;
    }
  }, [postingId]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(
          postingActions.setPostingById(postingId, await getPostingById()),
        );
      } catch (err) {
        // TODO setup a snackbar to handle errors
      }
    })();
  }, [dispatch, getPostingById, postingId]);

  return {
    posting,
  };
};

export default usePostingPostingById;
