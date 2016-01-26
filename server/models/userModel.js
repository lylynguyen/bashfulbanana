var db = require('../db');

module.exports = {
  getUsersInHouse: function(params, callback) {
    var queryStr="SELECT users.name, users.id from users WHERE houseId = ?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  }
}