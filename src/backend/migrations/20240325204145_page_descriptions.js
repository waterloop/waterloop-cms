
exports.up = function(knex) {
    knex.schema
    .createTable('page_descriptions', (table) => {
      table.increments('id'); 
      table.string('key').notNullable();
      table.string('title').notNullable();
      table.string('description', 5000); 
      table.json('images');
      table.datetime('last_updated', (options = { useTz: false }));

    })

};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('page_descriptions');
};
