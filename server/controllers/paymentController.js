var models = require('../models/paymentModel.js');
var jwt = require('jwt-simple');

module.exports = {
  getWhatYouOwe: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid];
    models.getWhatYouOwe(params, function(err, bills) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.json(bills);
      }
    });
  },

  getWhatIsOwedToYou: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid];
    models.getWhatIsOwedToYou(params, function(err, paymentOwed) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.json(paymentOwed);
      }
    });
  },

  getWhatYouHavePaid: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid];
    models.getWhatYouHavePaid(params, function(err, paymentHistory) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.json(paymentHistory);
      }
    })
  },

  getWhatHasBeenPaidToYou: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid];
    models.getWhatHasBeenPaidToYou(params, function(err, paymentHistory) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.json(paymentHistory);
      }
    })
  },

  postPayment: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [req.body.billId, token.userid, req.body.amount];
    models.postPayment(params, function(err, payment) {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log("payment is here", payment)
        res.json(payment.insertId);
      }
    });
  },

  postBill: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid, req.body.total, req.body.name, req.body.dueDate];
    models.postBill(params, function(err, payment) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(payment.insertId);
      }

    });
  },

  markPaymentAsPaid: function (req, res) {
    var params = [req.params.paymentId];
    models.markPaymentAsPaid(params, function (err, payment) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(payment);
      }
    });
  }
}
