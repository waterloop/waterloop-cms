import { useCallback, useEffect } from 'react';
import api from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import * as geeseFeaturesActions from '../../../state/geese-features/actions'
import * as geeseFeaturesSelectors from '../../../state/geese-features/selectors';

const useGeeseFeatures = () => {
  const dispatch = useDispatch();
  const geeseFeatures = useSelector(
    geeseFeaturesSelectors.allGeeseFeatures,
  ).features;

  useEffect(() => {
    (async () => {
      try {
        const geeseFeaturesResponse =
          await api.geeseFeatures.getGeeseFeatures();

        const newGeeseFeatures = geeseFeaturesResponse.data;

        dispatch(geeseFeaturesActions.updateGeeseFeatures(newGeeseFeatures));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const deleteFeature = useCallback(async (featureId) => {
    await api.geeseFeatures.deleteGeeseFeature(featureId);
    const geeseFeaturesResponse = await api.geeseFeatures.getGeeseFeatures();
    const newGeeseFeatures = geeseFeaturesResponse.data;
    dispatch(geeseFeaturesActions.updateGeeseFeatures(newGeeseFeatures));
  }, []);

  return {
    geeseFeatures,
    deleteFeature,
  };
};

export default useGeeseFeatures;
