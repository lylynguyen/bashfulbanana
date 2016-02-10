var mobileMessageModel = require('../models/mobileMessageModel.js');

module.exports = {
  get: function(req, res){
  var params = [houseId];
    mobileMessageModel.get(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  },

  post: function(req, res){
    var params = [houseId];
    mobileMessageModel.post(params, function(err, results){
      if(err) {
        res.sendStatus(500);
      }
      res.json(results);
    })
  }

}
