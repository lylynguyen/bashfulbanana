var mobileMessageModel = require('../models/mobileMessageModel.js');

module.exports = {
  get: function(req, res){
    var params = [req.params.houseId];
      mobileMessageModel.get(params, function(err, results) {
        if (err) {
          res.sendStatus(500);
        }
        res.json(results);
      });
    }
}
