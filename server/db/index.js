var mysql = require('mysql');


var connection = mysql.createConnection({
  host: process.env.DBHOST || null,
  user: process.env.DBUSER || "root",
  password: process.env.DBPASS || "",
  database: process.env.DATABASE || "bananas"
});

connection.connect();

module.exports = connection;
