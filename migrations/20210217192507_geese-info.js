
exports.up = (knex) => knex.schema.createTable("geese_info", table => {
  table.increments("id"); // 1 geese_info - many geese_images
  table.string("name").notNullable();
  table.string("description", 5000).notNullable();
  table.datetime("updated_at", options={useTz: false}).notNullable();
}).then(() => knex.schema.createTable("geese_images", table => {
  table.increments("id");
  table.integer("goose_id").notNullable();
  table.string("img_dir", 500).notNullable();  // Image directory

  table.foreign("goose_id").references("geese_info.id").onDelete("CASCADE");
}));

exports.down = knex => knex.schema.hasTable("geese_images", table => table.dropForeign("goose_id"))
  .then(()=> knex.schema.dropTableIfExists("geese_images"))
  .then(()=> knex.schema.dropTableIfExists("geese_info"));
