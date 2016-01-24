var paymentController = require('../controllers/paymentController.js');

module.exports = function(app, express) {
  app.get('/messages/:houseId', function(req, res) {
  });

  app.post('/messages', function(req, res) {

  });

  app.get('/chores/:houseId', function(req, res) {

  });

  app.post('/chores', function(req, res) {

  });

  app.put('/chores/:choreId', function(req, res) {

  });

  app.get('/payment/pay/:userId', paymentController.getPendingBills);

  app.post('/payment', paymentController.postPayment);

  app.get('/payment/owed/:userId', paymentController.getPaymentOwed);

  app.get('payment/completed/userId', paymentController.getPaymentHistory);
}
