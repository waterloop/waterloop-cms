exports.up = (knex) =>
  knex.schema.createTable('geese-features', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('picture').notNullable();
    table.string('description').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('geese-features');
