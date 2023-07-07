exports.up = (knex) =>
  knex.schema.createTable('geese_features', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('picture').notNullable();
    table.string('description').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('geese_features');
