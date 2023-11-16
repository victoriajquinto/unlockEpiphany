require('dotenv').config();
const dotenv = require('dotenv');
const pgPromise = require('pg-promise');

const pgp = pgPromise({});
const dbConfig = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
};

const pool = pgp(dbConfig);

module.exports = pool;