import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as sponsorActions from '../state/sponsors/actions';
import * as sponsorSelectors from '../state/sponsors/selectors';
import {fromServerSponsor} from '../utils/sponsors/sponsor-utils'; 

const useSponsors = () => {
  const dispatch = useDispatch();
  const sponsors = useSelector(sponsorSelectors.sponsors);
  const sponsorTiers = useSelector(sponsorSelectors.sponsorTiers);

  const getSponsors = useCallback(
    async () => {
      try {
        const response = await api.sponsors.getSponsors();
        const sponsorTiers = await api.sponsors.getSponsorTiers();
        
        return {sponsorTiers: sponsorTiers.data.map(datum => ({
            id: datum.id,
            text: datum.type
          })),
          
          sponsors: response.data.map(datum => (fromServerSponsor(datum)))
        };
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
      const {sponsorTiers, sponsors} = await getSponsors();
      dispatch(sponsorActions.setSponsorTiers(sponsorTiers));
      dispatch(sponsorActions.setSponsors(sponsors));
    })();
  }, [dispatch, getSponsors]);

  return {
    sponsorTiers,
    sponsors
  };
};

export default useSponsors;
