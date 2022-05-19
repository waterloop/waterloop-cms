exports.up = (knex) =>
  knex.schema.createTable('openings_description', (table) => {
    table.string('heading');
    table.text('body');
    table.boolean('active');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('openings_description');
