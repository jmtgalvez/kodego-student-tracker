const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

module.exports = db;