
exports.up = knex => knex.schema.createTable('postings', table => {
  table.increments('id'); // P-key
  table.string('title');
  table.integer('team_id');
  table.datetime('deadline', options={useTz: false});
  table.datetime('last_updated', options={useTz: false});
  table.string('location');
  table.integer('term_year');
  table.string('term_season');
  table.string('description', 2500);
  table.boolean('closed');
  table.string('time_commitment');

  table.foreign('team_id').references('team_descriptors.id').onDelete('CASCADE');
})
  .then(() => knex.schema.createTable('posting_tasks', table => {
    table.increments('id');
    table.string('task');
    table.integer('posting_id').index();

    table.foreign('posting_id').references('postings.id').onDelete('CASCADE');
  }))
  .then(() => knex.schema.createTable('posting_requirements', table => {
    table.increments('id');
    table.string('requirement');
    table.integer('posting_id').index();

    table.foreign('posting_id').references('postings.id').onDelete('CASCADE');
  }))
  .then(() => knex.schema.createTable('posting_info', table => {
    table.increments('id');
    table.string('info');
    table.integer('posting_id').index();

    table.foreign('posting_id').references('postings.id').onDelete('CASCADE');
  }));

exports.down = knex => knex.schema.hasTable('posting_requirements', table => { table.dropForeign('posting_id') })
  .then(() => knex.schema.hasTable('posting_tasks', table => { table.dropForeign('posting_id') }))
  .then(() => knex.schema.hasTable('posting_info', table => { table.dropForeign('posting_id') }))
  .then(() => knex.schema.hasTable('postings', table => { table.dropForeign('team_id')}))
  .then(() => knex.schema.dropTableIfExists('posting_info'))
  .then(() => knex.schema.dropTableIfExists('posting_requirements'))
  .then(() => knex.schema.dropTableIfExists('posting_tasks'))
  .then(() => knex.schema.dropTableIfExists('postings'));


