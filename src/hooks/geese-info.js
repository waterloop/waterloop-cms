import { useEffect } from 'react';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import * as geeseInfoActions from '../state/geese-info/actions';
import * as geeseInfoSelectors from '../state/geese-info/selectors';

const useGeeseInfo = () => {
  const dispatch = useDispatch();
  const geeseInfo = useSelector(geeseInfoSelectors.allGeeseInfo);
  useEffect(() => {
    (async () => {
      try {
        const geeseInfoResponse = await api.geeseInfo.getGeeseInfo();

        const newGeeseInfo = geeseInfoResponse.data;

        dispatch(geeseInfoActions.updateGeeseInfo(newGeeseInfo));
        console.log(newGeeseInfo);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  return {
    geeseInfo,
  };
};

export default useGeeseInfo;
