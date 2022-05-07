/* This defines the interface functions between the database and the backend for the sponsors table.
*  It's used to process and transfer info between the front end and back.
*/

import { toSponsors, fromSponsor, toSponsorDesc } from '../models/sponsors';
import { parseTimeForResponse, parseTimeFromRequest } from '../utils/db-dates';
import handleRawResponse from '../utils/handle-raw-response';

/**SPONSOR TIER API ENDPOINTS */
// Equivalent to SELECT * FROM sponsor_tiers
const getSponsorTiers = (db) => () => db('sponsor_tiers');


/**SPONSORS API ENDPOINTS */
// Equivalent to SELECT * FROM sponsors
const getSponsors = (db) => () => db('sponsors')
  .then((sponsors) => toSponsors(sponsors.map((sponsor) => {return {
    ...sponsor,
    join_date: parseTimeForResponse(sponsor.join_date)
  }})));


  const getSponsorsByIdWithTierName  = (db) => async (sponsorId) => {
    try {
      let sponsors = handleRawResponse(await db.raw(`
      SELECT sponsors.id as id, name, join_date, website, contributions, youtube, logo_dir, created_at, updated_at, sponsor_tiers.type as type
        FROM sponsors
        INNER JOIN sponsor_tiers on sponsors.type_id = sponsor_tiers.id
        WHERE sponsors.id = ?;
      `, [sponsorId])
      );

      return toSponsors(sponsors.map((sponsor) => ({
        ...sponsor,
       join_date: parseTimeForResponse(sponsor.join_date)
      })));

    } catch (err) {
      console.log('[getSponsorsByIdWithTierName]: ERROR');
      console.log(err);
      throw err;
    }
  }

  const getSponsorsWithTierName  = (db) => async () => {
    try {
      let sponsors = handleRawResponse(await db.raw(`
        SELECT sponsors.id as id, name, join_date, website, contributions, youtube, logo_dir, sponsor_tiers.type as type
        FROM sponsors
        INNER JOIN sponsor_tiers on sponsors.type_id = sponsor_tiers.id
      `)
      );

      return toSponsors(sponsors.map((sponsor) => ({
        ...sponsor,
       join_date: parseTimeForResponse(sponsor.join_date)
      })));

    } catch (err) {
      console.log('[getSponsorsWithTierName]: ERROR');
      console.log(err);
      throw err;
    }
  }

const addSponsor = (db) => (sponsor) => db('sponsors')
  .insert(
    fromSponsor({
      ...sponsor,
      joinDate: parseTimeFromRequest(sponsor.joinDate)
    })
  )
  .returning('id')
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch(err => {
    console.error(`Error in addSponsor: ${err}`);
    throw err;
  });


const updateSponsorById = (db) => (id, sponsor) => db('sponsors')
  .where({
    id
  })
  .update(
    fromSponsor({
      ...sponsor,

      // Ternary is for cases where joinDate need not be updated. Knex skips keys with undefined values.
      joinDate: sponsor.joinDate ? parseTimeFromRequest(sponsor.joinDate) : undefined
    })
  )
  .then((response) => {
    console.log(response);
    return response;
  }).catch(err => {
    console.error(`Error in updateSponsorById: ${err}`);
    throw err;
  });

const deleteSponsorById = (db) => (id) => db('sponsors')
  .where({
    id
  })
  .del()
  .then((response) => {
    console.log(response);
    return response;
  }).catch(err => {
    console.error(`Error in deleteSponsorById: ${err}`);
    throw err;
  });

/**SPONSOR DESCRIPTION API ENDPOINTS */
const getSponsorDesc = (db) => () => db('sponsor_desc')
  .where({ id: 1 })
  .first() // There should only be one entry in this table and it's id should be 1
  .then((res) => {
    let images;       // images array is stored as string in database, convert back to array:
    try {
      const resImages = res.images
      if (typeof resImages === 'string') {
        images = JSON.parse(res.images);
      } else if (typeof resImages === 'object') { // If array already
        images = resImages;
      }
    } catch (_) {
      // Empty array in database is stringified to something that isn't JSON for some reason.
      images = [];
    }

    let body = {
      ...res,
      images: images
    };
    delete body.id; // Since we should only have 1 entry.
    return toSponsorDesc(body);
  })
  .catch(err => {
    console.error(`Error in getSponsorDesc: ${err}`);
    throw err;
  });

const updateSponsorDesc = (db) => (data) => db('sponsor_desc')
  .update({
    ...data,
    images: JSON.stringify(data.images)
  })
  .where({
    id: 1, // There is only one item
  })
  .then((response) => {
    console.log(response);
    return response;
  }).catch(err => {
    console.error(`Error in updateSponsorDesc: ${err}`);
    throw err;
  });

export default (db) => ({
  getSponsorTiers: getSponsorTiers(db),
  getSponsors: getSponsors(db),
  getSponsorsByIdWithTierName: getSponsorsByIdWithTierName(db),
  getSponsorsWithTierName: getSponsorsWithTierName(db),
  addSponsor: addSponsor(db),
  updateSponsorById: updateSponsorById(db),
  deleteSponsorById: deleteSponsorById(db),

  getSponsorDesc: getSponsorDesc(db),
  updateSponsorDesc: updateSponsorDesc(db)
});
