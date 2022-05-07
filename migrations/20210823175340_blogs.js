exports.up = knex => knex.schema.createTable('blogs', table => {
    table.increments('id');
    table.string('author');
    table.string('title');
    table.string('summary');
    table.string('date');
    table.string('link');
    table.string('image');
    table.boolean('closed');
  });
  
  exports.down = knex =>
    knex.schema.dropTableIfExists('blogs');