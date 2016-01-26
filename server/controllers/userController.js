var userModel = require('../models/userModel.js');

module.exports = {
  getUsersInHouse: function (req, res) {
    var params = [req.params.houseId];
    userModel.getUsersInHouse(params, function(err, results) {
      if (err) {
        res.status(500);
      } else {
        res.json(results);
      }
    });
  }
}