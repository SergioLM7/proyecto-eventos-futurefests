require('dotenv').config();
const { Pool } = require('pg');

const localPoolConfig = new Pool ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
      }
})

/*LOCAL
const localPoolConfig = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});*/

module.exports = localPoolConfig;