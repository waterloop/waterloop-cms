/**NOTE: This migration is only relevant for a postgres database! 
 * (i.e. staging/production environments)
 * 
 * Code retrieved from https://stackoverflow.com/questions/36728899/knex-js-auto-update-trigger
 */
const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');
const fs = require('fs');

const SESSION_TABLE_QUERY = fs.readFileSync(`${__dirname}/prod script/session-table.sql`).toString();

const DROP_SESSION_TABLE_QUERY = `DROP TABLE "session";`;

exports.up = knex => ENV_IS_STAGING_OR_PROD ? knex.raw(SESSION_TABLE_QUERY) : Promise.resolve();
exports.down = knex => ENV_IS_STAGING_OR_PROD ? knex.raw(DROP_SESSION_TABLE_QUERY) : Promise.resolve();
