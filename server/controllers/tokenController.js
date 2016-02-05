var tokenModel = require('../models/tokenModel');
var houseModel = require('../models/houseModel');
var jwt = require('jwt-simple');

module.exports = {
  updateToken: function(req, res) {
    var token = JSON.parse(jwt.decode(req.headers.token, process.env.secret_code));
    console.log(typeof token);
    var params = [token.userid];
    console.log("parms update token:::::", params)
    houseModel.getHouseIdByUserId(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        req.session.regenerate(function() {
          token.houseId = results[0].houseId;
          console.log("RESULTS: NEW USERS HOUSE ID:", token.houseId);
          var encodedJwt = (jwt.encode(token, process.env.secret_code));
          req.session.jwt = encodedJwt;
          console.log("updating token: session === token", req.session.jwt === encodedJwt);
          res.send(req.session.jwt);
        });
      }
    });
  },

  updateAfterLeaveHouse: function(req, res) {
    var token = JSON.parse(jwt.decode(req.headers.token, process.env.secret_code));
    token.houseId = null;
    var encodedToken = jwt.encode(token, process.env.secret_code);
    res.send(encodedToken);
  } 
};