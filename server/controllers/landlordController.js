var landlordModel = require('../models/landlordModel');
var jwt = require('jwt-simple');

module.exports = {
  getHousesOwned: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    console.log("USER id", token.userid);
    var params = [token.userid];
    landlordModel.getHousesOwned(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  }
}