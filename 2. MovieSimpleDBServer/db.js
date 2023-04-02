const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'rootroot',
  host: 'localhost',
  port: 5432,
  database: 'movie_server_homework'
});

module.exports = pool;