var db = require('../db');

module.exports = {
  get: function (params, callback) {
    var queryStr = "SELECT users.name, messages.text, messages.time FROM messages LEFT OUTER JOIN users ON (messages.userid=users.id) WHERE messages.houseId=? ORDER BY messages.time LIMIT 50";
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  },

  post: function (params, callback) {
    var queryStr = "INSERT INTO Messages (userId, text, houseId, time) VALUES (?,?,?, NOW())";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    })
  } 

}

