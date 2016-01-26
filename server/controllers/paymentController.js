var models = require('../models/paymentModel.js');

module.exports = {
  getWhatYouOwe: function (req, res) {
    var params = [req.params.userId];
    models.getWhatYouOwe(params, function(err, bills) {
      if (err) {
        res.status(404);
      } else {
        res.json(bills);
      }
    });
  },

  getWhatIsOwedToYou: function (req, res) {
    var params = [req.params.userId];
    models.getWhatIsOwedToYou(params, function(err, paymentOwed) {
      if (err) {
        res.status(404);
      } else {
        res.json(paymentOwed);
      }
    });
  },

  getWhatYouHavePaid: function (req, res) {
    var params = [req.params.userId];
    models.getWhatYouHavePaid(params, function(err, paymentHistory) {
      if (err) {
        res.status(404);
      } else {
        res.json(paymentHistory);
      }
    })
  },

  getWhatHasBeenPaidToYou: function (req, res) {
    var params = [req.params.userId];
    models.getWhatHasBeenPaidToYou(params, function(err, paymentHistory) {
      if (err) {
        res.status(404);
      } else {
        res.json(paymentHistory);
      }
    })
  },

  postPayment: function (req, res) {
    var params = [req.body.billId, req.body.userId, req.body.amount];
    models.postPayment(params, function(err, payment) {
      if (err) {
        res.status(500);
      } else {
        console.log("payment is here", payment)
        res.json(payment);
      }
    });
  },

  postBill: function (req, res) {
    var params = [req.body.userId, req.body.total, req.body.name, req.body.dueDate];
    models.postBill(params, function(err, payment) {
      if (err) {
        res.status(500);
      } else {
        res.json(payment);
      }

    });
  },

  markPaymentAsPaid: function (req, res) {
    var params = [req.params.paymentId];
    models.markPaymentAsPaid(params, function (err, payment) {
      if (err) {
        res.status(500);
      } else {
        res.json(payment);
      }
    });
  }
}
