var mysql = require('mysql');


var connection = mysql.createConnection({
  user: process.env.DBUSER || "root",
  password: process.env.DBPASS || "",
  database: process.env.DATABASE || "bananas",
  host: process.env.DBHOST || null
});

connection.connect();

module.exports = connection;
