exports.up = (knex) =>
  knex.schema.createTable('geese-features', (table) => {
    table.increments('id');
    table.string('name');
    table.string('picture');
    table.string('description');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('geese-features');
