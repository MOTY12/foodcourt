// Update with your config settings.
import * as Knex from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: require('find-config')('.env') });

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, './migrations'),
    },
  },

};

