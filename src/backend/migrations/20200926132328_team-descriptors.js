exports.up = knex => knex.schema.createTable('team_descriptors', table => {
  table.increments('id'); // P-key
  table.string('team_name');
  table.string('description');
  table.datetime("updated_at", options={useTz: false}).notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('team_descriptors');
