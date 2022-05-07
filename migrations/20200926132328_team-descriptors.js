exports.up = knex => knex.schema.createTable('team_descriptors', table => {
  table.increments('id'); // P-key
  table.string('team_name');
  table.string('description');
});

exports.down = knex => knex.schema.dropTableIfExists('team_descriptors');
