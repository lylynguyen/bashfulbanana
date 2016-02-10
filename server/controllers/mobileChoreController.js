var mobileChoreModel = require('../models/mobileChoreModel.js');

module.export = {
  get: function(req, res){ 
    var params = [houseId];
    mobileChoreModel.get(params, function(err, results) {
      if(err){
        res.sendStatus(500);
      }
      res.json(results)
    });
  },

  post: function (req, res) {
    console.log('POST CHORES TOKEN: ', token);   
    var params = [req.body.userId, req.body.name, req.body.category, req.body.dueDate, houseId];
    mobileChoreModel.post(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.status(201).json(results.insertId);
    });
  },

  delete: function (req, res) {
    var params = [req.params.choreId];
    mobileChoreModel.delete(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  }
}
