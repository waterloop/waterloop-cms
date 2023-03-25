exports.up = knex => knex.schema.createTable('blogs', table => {
    table.increments('id');
    table.string('author');
    table.string('title');
    table.string('summary');
    table.string('date');
    table.specificType("content", "text");
    table.string('image');
    table.boolean('closed');
    table.string('visibility');
    table.string('category');
  });
  
  exports.down = knex =>
    knex.schema.dropTableIfExists('blogs');