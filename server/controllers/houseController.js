var houseModel = require('../models/houseModel'); 

module.exports = {
  postHouse: function(req, res) {
    //extract house name from req.body
    var name = req.body.name
    //insert that name into params
    var params = [name]
    houseModel.postHouse(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        console.log('postHouse sending back results')
        res.json(results);
      }
    });
  },

  getHousebyHouseId: function(req, res) {
    //set params to equal the token from the params
    var params = [req.params.token];
    houseModel.getHouse(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },

  updateUserHouseId: function(req, res) {
    //need a way to send houseId with the user. We have a param
    //from the route, maybe we can send the houseId as data
    //and extract it from req.body. First set params to userId
    var houseId = req.body.houseId;
    var params = [houseId, req.params.userId];
    houseModel.getHouse(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  }
}