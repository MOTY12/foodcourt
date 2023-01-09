// Update with your config settings.

const path = require("path");
const dotenv = require("dotenv");

dotenv.config();



/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


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
      directory: path.join(__dirname, 'src/db/migrations'),
    },
  },

};