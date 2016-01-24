var mysql = require('mysql');


var connection = mysql.createConnection({
  user: "root",
  password: "mypw",
  database: "bananas"
});

connection.connect();

module.exports = connection;
