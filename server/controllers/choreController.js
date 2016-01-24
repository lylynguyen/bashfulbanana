var choreModel = require('../models/choreModel.js');

module.exports = {
  get: function(req, res) {
    var houseId = req.params.houseId;
    choreModel.get(houseId, function(err, results){
      res.json(results);
    })
  },
  post: function(req, res) {
    
  }
}