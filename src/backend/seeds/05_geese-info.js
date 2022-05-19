const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');
const { parseTimeFromRequest } = require('../utils/db-dates');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('geese_info')
      .del()
      .then(() => {
        return knex('geese_info').insert([
          {
            name: 'Goose I Test',
            description: 'This is Goose I',
            updated_at: parseTimeFromRequest(new Date(1609459569000)),
          },
          {
            name: 'Goose II Test',
            description: 'This is Goose II',
            updated_at: parseTimeFromRequest(new Date(1609450000000)),
          },
          {
            name: 'Goose IV Test',
            description: 'This is not Goose III',
            updated_at: parseTimeFromRequest(new Date(100000000000)),
          },
          {
            name: 'Goose V Test',
            description: 'This is Goose V',
            updated_at: parseTimeFromRequest(new Date(2147483647000)),
          },
        ]);
      })
      .then(() => {
        return knex('geese_images').del();
      })
      .then(async () => {
        const geese = await knex('geese_info');
        return knex('geese_images').insert([
          { goose_id: geese[0].id, img_dir: 'test1.png' },
          { goose_id: geese[1].id, img_dir: 'test2.gif' },
          { goose_id: geese[2].id, img_dir: 'test3.wav' },
          { goose_id: geese[2].id, img_dir: 'test4.bmp' },
        ]);
      });
  };
} else {
  exports.seed = function (knex) {
    return Promise.resolve();
  };
}
