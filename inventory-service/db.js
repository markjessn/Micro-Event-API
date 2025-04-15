const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL directly
});

module.exports = pool;
