

var mobileUserModel = require('../models/mobileUserModel.js')
module.exports = {
  getUserHouseIdWithEmail: function(req, res){
    var params = [req.params.email];
    mobileUserModel.getUserHouseIdWithEmail(params, function(err, result){
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(result)
      }
    });
  }
}
