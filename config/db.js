// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'stream_db',
  password: 'password'
});

module.exports = connection;
