const knex = require('knex');

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.sqlite',
  },
  useNullAsDefault: true,
});
module.exports = connection;
