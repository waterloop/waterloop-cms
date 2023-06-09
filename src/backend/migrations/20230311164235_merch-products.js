exports.up = (knex) =>
  knex.schema
    .createTable('merch_products', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('category').notNullable();
    })
    .then(() =>
      knex.schema.createTable('merch_product_variations', (table) => {
        table.increments('id');
        table.string('variation_name').notNullable();
        table.integer('product_id').index();
        table.integer('price').notNullable();
        table.integer('stock').notNullable();
        table.string('picture');
        table.datetime('last_updated', (options = { useTz: false }));

        table
          .foreign('product_id')
          .references('merch_products.id')
          .onDelete('CASCADE');
      }),
    );

exports.down = (knex) =>
  knex.schema
    .hasTable('merch_product_variations', (table) =>
      table.dropForeign('product_id'),
    )
    .then(() => knex.schema.dropTableIfExists('merch_product_variations'))
    .then(() => knex.schema.dropTableIfExists('merch_products'));
