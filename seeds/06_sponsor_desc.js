const { ENV_IS_STAGING_OR_PROD } = require("../knexfile");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  if (ENV_IS_STAGING_OR_PROD) return Promise.resolve();
  return knex('sponsor_desc').del()
    .then(() => {
      return knex('sponsor_desc').insert([
        { id: 1, title: "", description: "", images: JSON.stringify([])}
      ]);
    });
};
