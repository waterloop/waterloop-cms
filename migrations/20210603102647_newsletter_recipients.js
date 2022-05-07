exports.up = (knex) => {
  return knex.schema.createTable('newsletter_recipients', (table) => {
    table.increments('id').primary(); // P-key
    table.string('email').notNullable();
    table.string('name').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('newsletter_recipients');
};
