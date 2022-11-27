const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('feature_permissions')
    .del()
    .then(function () {
      // Inserts seed entries
      if (!ENV_IS_STAGING_OR_PROD) {
        return knex('feature_permissions').insert([
          { id: 1, group_id: 1, feature_name: 'View Website' },
          { id: 2, group_id: 1, feature_name: 'Edit Content' },
          { id: 3, group_id: 2, feature_name: 'View Website' },
          { id: 4, group_id: 3, feature_name: 'Edit Content' }, // enables web team to access website in dev mode only.
        ]);
      } else {
        return knex('feature_permissions').insert([
          { id: 1, group_id: 1, feature_name: 'View Website' },
          { id: 2, group_id: 1, feature_name: 'Edit Content' },
          { id: 3, group_id: 2, feature_name: 'View Website' },
          { id: 4, group_id: 3, feature_name: 'View Website' },
        ]);
      }
    });
};