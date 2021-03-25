import React from 'react';
import useSponsors from '../../hooks/sponsors';

const SponsorsPage = () => {
  const { sponsorTiers, sponsors } = useSponsors();
  return (
    <div>
      {"Main Sponsor Page (goto /<num> to edit specific sponsor)"}
    </div>
  );
}

export default SponsorsPage;