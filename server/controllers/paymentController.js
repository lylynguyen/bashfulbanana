var models = require('../models/paymentModel.js');

module.exports = {
  getPendingBills: function (req, res) {
    var userId = req.params.userId;
    models.getPendingBills(userId, function(err, bills) {
      if (err) {
        res.status(404);
      } else {
        res.json(bills);
      }
    });
  },

  getPaymentOwed: function (req, res) {
    var userId = req.params.userId;
    models.getPaymentOwed(userId, function(err, paymentOwed) {
      if (err) {
        res.status(404);
      } else {
        res.json(paymentOwed);
      }
    });
  },

  postPayment: function (req, res) {
    var params = [req.body.billId, req.body.userId, req.body.amount, req.body.paid, req.body.datePaid];
    models.postPayment(params, function(err, payment) {
      if (err) {
        res.status(500);
      } else {
        res.json(payment);
      }
    });
  },

  getPaymentHistory : function (req, res) {
    var userId = req.params.userId;
    models.getPaymentHistory(userId, function(err, paymentHistory) {
      if (err) {
        res.status(404);
      } else {
        res.json(paymentHistory);
      }
    })
  }
};
