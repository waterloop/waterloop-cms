const { onUpdateTrigger } = require('../knexfile');

exports.up = knex => knex.schema.createTable("sponsor_tiers", table => {
  table.increments(); // Tier ID primary key.
  table.string("type").notNullable(); // Actual tier name like "hypersonic" or "supersonic"
})

.then(() => knex.schema.createTable("sponsors", table => {
  table.increments();
  table.string("name").notNullable();
  table.integer("type_id").notNullable();
  table.datetime('join_date', options={useTz: false}).notNullable();  // UNIX time in seconds.
  table.string("website");
  table.string("contributions", 5000);    // Raw HTML for rich text support.
  table.string("youtube");
  table.string("logo_dir");

  table.timestamps(true, true); // Add created_at and updated_at columns.

  table.foreign("type_id").references("sponsor_tiers.id").onDelete("CASCADE");
}))
.then(() => knex.raw(onUpdateTrigger('sponsors')))

exports.down = knex => knex.schema.hasTable("sponsors", table => table.dropForeign("type_id"))
  .then(()=> knex.schema.dropTableIfExists("sponsors"))
  .then(()=> knex.schema.dropTableIfExists("sponsor_tiers"));
