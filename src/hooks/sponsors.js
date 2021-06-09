import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as sponsorActions from '../state/sponsors/actions';
import * as sponsorSelectors from '../state/sponsors/selectors';
import {fromServerSponsor} from '../utils/sponsors/sponsor-utils'; 

const useSponsors = () => {
  const dispatch = useDispatch();
  const sponsors = useSelector(sponsorSelectors.sponsors);
  const sponsorDesc = useSelector(sponsorSelectors.sponsorDesc);
  const sponsorTiers = useSelector(sponsorSelectors.sponsorTiers);

  const getSponsors = useCallback(
    async () => {
      try {
        const sponsorTiers = await api.sponsors.getSponsorTiers();
        const sponsorDesc = await api.sponsors.getSponsorDesc();

        const joinTierName = true;
        const response = await api.sponsors.getSponsors(joinTierName);

        return {sponsorTiers: sponsorTiers.data.map(datum => ({
            id: datum.id,
            text: datum.type
          })),
          sponsorDesc: sponsorDesc.data,
          sponsors: response.data.map(datum => (fromServerSponsor(datum)))
        };
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
      }
    }, [],
  );

  useEffect(() => {
    (async () => {
      const {sponsorTiers, sponsorDesc, sponsors} = await getSponsors();
      dispatch(sponsorActions.setSponsorTiers(sponsorTiers));
      dispatch(sponsorActions.setSponsorDesc(sponsorDesc));
      dispatch(sponsorActions.setSponsors(sponsors));
    })();
  }, [dispatch, getSponsors]);

  return {
    sponsorTiers,
    sponsorDesc,
    sponsors,
  };
};

export default useSponsors;
