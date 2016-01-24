var db = require('../db');

module.exports = {
  get: function (houseId, callback) {
    var queryStr = "select * from chores where chores.houseId=" + houseId;
    db.query(queryStr, function(err, results) {
      callback(err, results);
    })
  },
  post: function (params, callback) {
    var queryStr=""
  },
  put: function (params, callback) {
    
  }
}