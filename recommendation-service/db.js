const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'microservices_db',
  password: 'weaktipe345',
  port: 5432, 
});

module.exports = pool;
