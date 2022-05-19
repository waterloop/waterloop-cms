const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('newsletter_recipients')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('newsletter_recipients').insert([
          {
            email: 'john.doe.waterloop@gmail.com',
            name: 'John Doe',
          },
          {
            email: 'samantha.gibson.waterloop@gmail.com',
            name: 'Samantha Gibson',
          },
          {
            email: 'connor.howard.waterloop@yahoo.ca',
            name: 'Connor Howard',
          },
          {
            email: 'emma.paterson.waterloop@yahoo.ca',
            name: 'Emma Paterson',
          },
        ]);
      });
  };
} else {
  exports.seed = async function (knex) {};
}
