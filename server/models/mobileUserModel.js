var db = require('../db');

module.exports ={
  getUserHouseIdWithEmail: function(params, callback){
    var queryStr  = "SELECT id, HouseId from Users where email = ?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  }
}
