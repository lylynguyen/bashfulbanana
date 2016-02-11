var db = require('../db');

module.exports = {
  get: function (params, callback) {
    var queryStr = "SELECT Users.name, Users.userImageUrl, Messages.text, DATE_FORMAT(Messages.time,'%W, %M %e, %Y %h:%i %p') AS time FROM Messages LEFT OUTER JOIN Users ON (Messages.userid=Users.id) WHERE Messages.houseId=? AND landlordChat=0 ORDER BY Messages.time DESC LIMIT 50";
    //var queryStr = 'SELECT * from Users'
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  }
}


