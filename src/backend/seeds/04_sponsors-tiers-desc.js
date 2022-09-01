const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');
const { parseTimeFromRequest } = require('../utils/db-dates');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('sponsors')
      .del()
      .then(() => {
        return knex('sponsor_tiers').del();
      })
      .then(() => {
        // Inserts seed entries
        return knex('sponsor_tiers').insert([
          { type: 'Hypersonic' },
          { type: 'Supersonic' },
          { type: 'Transsonic' },
          { type: 'Sonic' },
          { type: 'Supporter' },
          { type: 'Old Sponsor'},
        ]);
      })
      .then(async () => {
        const tiers = await knex('sponsor_tiers'); // Each time the seed file runs in testing, the counter continues to increment, so Hypersonic will start with ID 1, and then get deleted and made again with Id 5 and so on... so we need to query the db to find out what their id's really are
        return knex('sponsors').insert([
          {
            name: 'Walmart',
            type_id: tiers[0].id,
            join_date: parseTimeFromRequest(new Date(1609459569000)),
            website: 'www.example.com',
            contributions: 'I supplied Waterloop parts, including the LIM.',
            youtube: 'dQw4w9WgXcQ',
            logo_dir: 'walmart.png',
          },
          {
            name: 'Walmart2',
            type_id: tiers[1].id,
            join_date: parseTimeFromRequest(new Date(1609450000000)),
            website: 'www.example2.com',
            contributions:
              'I prevented the geese from sabotaging the Waterloop pod.',
            logo_dir: 'kmart.png',
          },
          {
            name: 'NotWalmart',
            type_id: tiers[2].id,
            join_date: parseTimeFromRequest(new Date(100000000000)),
            website: 'www.example3.com',
            contributions:
              "I'm just here for the credit. I paid $1 for this tier.",
            youtube: 'oHSuyTrKwdg',
            logo_dir: 'mcdonalds.png',
          },
          {
            name: 'TotallyAWalmart',
            type_id: tiers[3].id,
            join_date: parseTimeFromRequest(new Date(2147483647000)),
            contributions:
              "Uhh... I definitely didn't hack into the site and steal this tier from another company...",
            youtube: 'dQw4w9WgXcQ',
            logo_dir: 'default_logo.png',
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return knex('sponsor_tiers')
      .del()
      .then(() => {
        return knex('sponsor_tiers').insert([
          { type: 'Hypersonic' },
          { type: 'Supersonic' },
          { type: 'Transsonic' },
          { type: 'Sonic' },
          { type: 'Supporter' },
          { type: 'Old Sponsor'},
        ]);
      });
  };
}
