export const toServerSponsor = (sponsor) => {
  try {
    return {
      name: sponsor.name,
      website: sponsor.website,
      typeId: sponsor.tierId,
      joinDate: termSeasonYearToTimestampMillisec(sponsor.termSeason, sponsor.termYear),
      contributions: sponsor.description,
      logoDir: sponsor.logoStr,
      videoLink: sponsor.youtube
    }
    
  } catch (e) {
    throw e;
  }
};

export const fromServerSponsor = (sponsor) => ({
  sponsorId: sponsor.id,
  name: sponsor.name,
  website: sponsor.website,
  tierId: sponsor.typeId,
  ...timestampMillisecToTermSeasonYear(sponsor.joinDate),
  description: sponsor.contributions,
  logoStr: sponsor.logoDir,
  videoLink: sponsor.youtube
});

const termSeasonYearToTimestampMillisec = (season, year) => {
  let month;
  switch (season) {
    case 'WINTER':
      month = 0;
      break;
    case 'SPRING':
      month = 4;
      break;
    case 'FALL':
      month = 8;
      break;
    default:
      throw new Error(`Unknown season: ${season}`);
   }

   return (new Date()).setFullYear(year, month, 1);
};

// TODO: Maybe account for timezone?
const timestampMillisecToTermSeasonYear = (timestamp) => {
  const date = new Date(timestamp);
  
  // TODO: Enumerate term seasons.
  // NOTE: Months are 0-indexed.
  let season = 'WINTER';

  if (date.getMonth() > 3) {
    season = 'SPRING';
  }

  if (date.getMonth() > 7) {
    season = 'FALL';
  }

  return {
    termSeason: season,
    termYear: date.getFullYear(),
  }
};