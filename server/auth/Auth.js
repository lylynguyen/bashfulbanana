var userController = require('../controllers/userController.js');
var jwt = require('jwt-simple');

var isLoggedIn = function(req) {
  //return req.session ? !!req.session.jwt : false;
  return req.session && req.session.jwt;
};


module.exports = {
  checkUser: function(req, res, next){
    if (!isLoggedIn(req)) {
      res.redirect('/login');
    } else {
      next();
    }
  }, 

  hasJwt: function(req, res) {
    var token = jwt.decode(req.headers.token, process.env.secret_code);
    if (req.headers.token) {
      next();
    } else {

    }
  }

  
};
