# Purpose
This is the backend for the Content Management System that manages the main website.

# Setup: Running the dev server

Before beginning, please ensure you're using a version before Node v16 (functionality is questionable with 16+).

1. Install node packages
`npm ci`
2. Install knex globally
`npm install -g knex`
This will allow you to run migrations from the cmd

3. Launch the docker development database with the following command: `npm run docker:dev`

4. Migrate the database (create the tables in database) by running the command `npm run migrate` or `knex migrate:latest`

5. Seed the database (populate with actual data) by running the command `npm run seed` or `knex seed:run` 

6. run `npm run dev` to start the server

# Building for Production
`npm run build`

# Creating a Docker container
*Note: Run all commands from the root directory of the project.*
1. Build the dev database: `npm run docker:dev`
2. Build the test database: `npm run docker:test`

# Knex

## Making a migration
### `knex migrate:make <migration-name>`
This makes a timestamped migration file in the migrations folder.
create tables using the exports.up, remove tables using the exports.down
Tables should be removed in the opposite order that they are added.

## Troubleshooting
If you ever run into the error message "Uncaught Migration table is already locked" during integration testing,
paste the following code inside the "beforeEach" function to force unlock the table (before the rollback code, and ensuring the ".then()" chain is added after), run the test once, then remove the code:

`db.migrate.forceFreeMigrationsLock()`

Alternatively, through the command line, run the following code to force unlock tables:

`knex migrate:unlock`

**NOTE: Make sure you're on the same runtime environment (e.g. if the issue happened on the test environment, ensure that the environment variable NODE_ENV=test)**

Usually this issue happens when a migration is either interrupted externally (e.g. Ctrl^C) or an error causes knex.js to crash during a migration.

**NOTE: You can also delete the docker container that is running the postgresql test-db. This will inherently unlock the table for you**

## Making a seed
A seed file allows you to fill your db with data

### `knex seed:make <seed-number>_<seed name>`
Check the seeds directory and change the number accordingly

Note: For organization, seeds should be in the same or a very similar order to the order of migration files

# Tests

This section outlines the commands for running tests.

1. To start the docker test database, run the following command:
`npm run docker:test`

2. Migrate the database with `npm run test:migrate:latest`

3. Then, seed the database with `npm run test:seed`

Note that, when you complete these steps, if you use vscode, you can easily reuse these containers you've made on your local machine with the docker extension (this includes the dev  database container as well).

This will allow you to run tests against an isolated postgresql instance

## Unit Tests

Unit Tests are ran with: `npm run test:unit`

Unit tests should be written to test internal logic such as helper functions and models

## Integration Tests

Integration Tests are ran with:

`npm run test:integration` or `npm run test:integration`

Integration tests are written for all endpoints to ensure that the correct data and responses are returned


## Testing the production environment locally
These steps are for testing the production environment if you do not have docker installed.

If you need to quickly check that everything works fine on a production environment, then the following steps should cover most cases:
1. Install [pgadmin 4](https://www.pgadmin.org/download/). You can leave every install option as its default.
2. Start the pgadmin 4 tool.
3. In the left panel, expand the "Server" entry and navigate to "databases". Right click and create a new database. Name it `waterloop_cms` or another preferred name.
4. We will now populate the database with the required CMS tables. Navigating back to your local project, insert the following in your .env file:
```
DATABASE_URL=postgres://<user>:<password>@localhost:5432/<database_name>
```
The `<user>` would be the username you used to create the server when you've setup the application for the first time (postgres by default). The `<password>` is the password you set for your server. By default, the server is started on localhost on port 5432.

***NOTE**: ensure your password is not committed to the repository, or shared with anyone else!*

The .env file is git-ignored, but it's best to double-check!

5. Run the production migrations using `npm run production:migrate:latest` and seed the database using `npm run production:seed`. Other commands can be found in package.json.
6. Once everything works, build your application for production and then start it!

# Deploying to Heroku
Precursor:
- Download and install the heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- Login into heroku cli with: `heroku login` and follow the steps to create an ssh key for your machine

Deployment
- Checkout master branch
- Ensure all changes are up to date
- Deploy through git using `git push heroku master`
- Check logs to monitor the deploy using `heroku logs --tail`

## Running migrations on Heroku:
`heroku run knex migrate:latest -a waterloop-cms`

## Accessing the Heroku dashboard
Speak to your lead about getting credentials for the heroku dashboard.
