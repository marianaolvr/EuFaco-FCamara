const knex = require('knex');

const MONGO_URL = process.env.MONGODB_URI

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.sqlite',
  },
  useNullAsDefault: true,
});
module.exports = connection;
