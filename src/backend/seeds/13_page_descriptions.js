const { parseTimeFromRequest } = require('../utils/db-dates');
const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    return knex('page_descriptions')
      .del()
      .then(() => {
        return knex('page_descriptions').insert([
          {
            id: 1,
            key: 'sponsors',
            title: 'Page title 1',
            description: 'Page desc 1',
            images: JSON.stringify([]),
            last_updated: parseTimeFromRequest(Date.now()),
          },
          {
            id: 2,
            key: 'openings',
            title: 'Page title 2',
            description: 'Page desc 2',
            images: JSON.stringify([]),
            last_updated: parseTimeFromRequest(Date.now()),
          },
          {
            id: 3,
            key: 'team',
            title: 'Page title 3',
            description: 'Page desc 3',
            images: JSON.stringify([]),
            last_updated: parseTimeFromRequest(Date.now()),
          },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  };
}
