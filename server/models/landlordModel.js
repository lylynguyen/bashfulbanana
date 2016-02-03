var db = require('../db');

module.exports = {
  getHousesOwned: function(params, callback) {
    var queryStr = "SELECT House.name, House.id, House.address, House.token FROM House WHERE landlordId=?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  }
}