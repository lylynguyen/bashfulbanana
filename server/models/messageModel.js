var db = require('../db');

module.exports = {
  get: function (params, callback) {
    var queryStr = "SELECT * FROM Messages WHERE houseId=? LIMIT 50";
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  },

  post: function (params, callback) {
    var queryStr = "INSERT INTO Messages (userId, text, houseId) VALUES (?,?,?)";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    })
  } 

}

