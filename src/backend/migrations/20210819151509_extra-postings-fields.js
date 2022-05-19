
exports.up = function(knex) {
  return knex.schema.createTable('posting_recommended_skills', (table) => {
    table.increments('id');
    table.string('recommended_skill');
    table.integer('posting_id').index();

    table.foreign('posting_id').references('postings.id').onDelete('CASCADE');
  })
  .then(() => knex.schema.createTable('posting_skills_to_be_learned', (table) => {
    table.increments('id');
    table.string('skill_to_be_learned');
    table.integer('posting_id').index();

    table.foreign('posting_id').references('postings.id').onDelete('CASCADE');
  }))
};

exports.down = function(knex) {
  return knex.schema.hasTable('posting_recommended_skills', table => { table.dropForeign('posting_id') })
    .then(() => knex.schema.hasTable('posting_skills_to_be_learned', table => { table.dropForeign('posting_id') }))
    .then(() => knex.schema.dropTableIfExists('posting_recommended_skills'))
    .then(() => knex.schema.dropTableIfExists('posting_skills_to_be_learned'))
};
