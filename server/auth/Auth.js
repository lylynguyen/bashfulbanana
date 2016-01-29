
var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

module.exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    console.log(":(");
    res.redirect('/');
  } else {
    next();
  }
}
