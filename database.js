  // Proper way to initialize and share the Database object

  // Loading and initializing the library:
  const pgp = require('pg-promise')();

  // Preparing the connection details:

  const cn = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`;

  // Creating a new database instance from the connection details:
  const db = pgp(cn);

  // Exporting the database object for shared use:
  module.exports = db;
