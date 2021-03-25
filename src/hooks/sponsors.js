import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import api from '../api';
import * as sponsorActions from '../state/sponsors/actions';
import * as sponsorSelectors from '../state/sponsors/selectors';

// TODO: Abstract this as a utility component. Maybe account for timezone?
const timestampMillisecToTermSeasonYear = (timestamp) => {
  const date = new Date(timestamp);
  
  // TODO: Enumerate term seasons.
  let season = 'WINTER';

  if (date.getMonth() > 4) {
    season = 'SPRING';
  }

  if (date.getMonth() > 8) {
    season = 'FALL';
  }

  return {
    termSeason: season,
    termYear: date.getFullYear(),
  }
};

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
          
          sponsors: response.data.map(datum => ({
            sponsorId: datum.id,
            name: datum.name,
            website: datum.website,
            tierId: datum.typeId,
            ...timestampMillisecToTermSeasonYear(datum.joinDate),
            description: datum.contributions,
            logoStr: datum.logoDir,
            videoLink: datum.youtube
          }))
        };
        // return dateStringsToDates(response.data.map((item) => ({ ...item, team: teams.data.find((team) => team.id === item.teamId).teamName })));
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
