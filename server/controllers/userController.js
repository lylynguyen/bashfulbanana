var userModel = require('../models/userModel.js');

module.exports = {
  getUsersInHouse: function (req, res) {
    var params = [req.params.houseId];
    userModel.getUsersInHouse(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
  findUserByVenmoId: function (req, res) {
    var params = [req.params.venmoId];
    userModel.findUserByVenmoId(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },
  postUser: function (req, res) {
    var name = req.body.name
    var houseId = parseInt(req.body.houseId);
    var venmoName = req.body.venmoName;
    var username = req.body.username;
    var email = req.body.email;
    var provider = req.body.provider;
    var venmo = req.body.venmo;
    var balance = parseFloat(req.body.balance);
    var access_token = req.body.access_token;
    var refresh_token = req.body.refresh_token;
    var venmoid = req.body.venmoid;

    var params = [name, houseId, venmoName, username, email, provider, venmo, balance, access_token, refresh_token, venmoid];

    userModel.postUser(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results.insertId);
      }
    })
  },
  putUser: function (req, res) {
    var params = [req.body.balance, req.body.access_token, req.body.venmo, req.body.venmoid];
    
    userModel.putUser(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  }
}