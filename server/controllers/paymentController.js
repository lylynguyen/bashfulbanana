var models = require('../models/paymentModel.js');

module.exports = {
  getPendingBills: function (req, res) {
    var userId = req.params.userId;
    models.getPendingBills(function(err, bills) {
      if (err) {
        res.status(404);
      } else {
        res.json(bills);
      }
    });
  }
}