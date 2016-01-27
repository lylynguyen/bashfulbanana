var choreModel = require('../models/choreModel.js');

module.exports = {
  get: function (req, res) {
    var params = [req.params.houseId];

    choreModel.get(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  },

  post: function (req, res) {
    var params = [req.body.userId, req.body.name, req.body.category, req.body.dueDate, req.body.houseId];
    
    choreModel.post(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.status(201).json(results.insertId);
    }); 
  },

  put: function (req, res) {
    var params = [req.params.choreId];
  
    choreModel.put(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.status(200).json(results);
    });
  },
  delete: function (req, res) {
    var params = [req.params.choreId];

    choreModel.delete(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  }
}
