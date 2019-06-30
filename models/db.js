const { Pool, Client } = require('pg');

// connect to postgres database
const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'scrum',
    password: '',
    port: 5432
});

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
  }
