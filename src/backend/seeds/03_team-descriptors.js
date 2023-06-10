const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');
const { parseTimeFromRequest } = require('../utils/db-dates');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('team_descriptors')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('team_descriptors').insert([
          {
            team_name: 'WebTeams',
            description: 'A team',
            updated_at: parseTimeFromRequest(new Date(1609450000000)),
          },
          {
            team_name: 'Team Hub',
            description: 'Another Team',
            updated_at: parseTimeFromRequest(new Date(2147483647000)),
          },
        ]);
      });
  };
}

// This seeding does not function, due to a foreign constraint in production environment
// else if (process.env.NODE_ENV === 'production') {
//   exports.seed = function (knex) {
//     return knex('team_descriptors')
//       .del()
//       .then(function () {
//         return knex('team_descriptors').insert([
//           { id: 1, team_name: 'Web Team', description: ''},
//           { id: 2, team_name: 'Mechanical', description: ''},
//           { id: 3, team_name: 'Electrical - BMS', description: ''},
//           { id: 4, team_name: 'Electrical - Motor Controller', description: ''},
//           { id: 5, team_name: 'Electrical - Embedded', description: ''},
//           { id: 6, team_name: 'Software - BMS', description: ''},
//           { id: 7, team_name: 'Software - Motor Controller', description: ''},
//           { id: 8, team_name: 'Software - Embedded', description: ''},
//           { id: 9, team_name: 'Propulsion', description: ''},
//           { id: 10, team_name: 'Team Hub', description: ''},
//           { id: 11, team_name: 'Business', description: ''},
//           { id: 12, team_name: 'Infrastructure', description: ''},
//         ])
//       })
//   }
// }
else {
  exports.seed = function (knex) {
    return Promise.resolve();
  };
}
