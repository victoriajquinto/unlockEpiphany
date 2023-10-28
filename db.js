require('dotenv').config();
const dotenv = require('dotenv');
const pgPromise = require('pg-promise');

const pgp = pgPromise({});
const pool = pgp(process.env.DATABASE_URL);

module.exports = pool;