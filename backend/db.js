const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'userTest',
  password: 'passwordTest',
  database: 'databaseTest'
});

module.exports = pool;