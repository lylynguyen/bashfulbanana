var messageModel = require('../models/messageModel.js');
var jwt = require('jwt-simple');

module.exports = {

  get: function(req, res) {
    var token = JSON.parse(jwt.decode(req.headers.token, process.env.secret_code));
    var params = [token.houseId];
    console.log("GET MESSAGES PARAMS", params)

    messageModel.get(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  },

  post: function(req, res) {
    var token = JSON.parse(jwt.decode(req.headers.token, process.env.secret_code));
    console.log("TOKEN", token)
    var params = [token.userid, req.body.text, token.houseId];
    console.log("PARAMS", params)
    messageModel.post(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  },

  getLandlordChat: function(req, res) {
    var token = JSON.parse(jwt.decode(req.headers.token, process.env.secret_code));
    var params = [token.houseId];

    messageModel.getLandlordChat(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  },

  postToLandlordChat: function(req, res) {
    var token = JSON.parse(jwt.decode(req.headers.token, process.env.secret_code));
    var params = [token.userid, req.body.text, token.houseId];
    messageModel.postToLandlordChat(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  }
}