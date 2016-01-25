var paymentController = require('../controllers/paymentController.js');
var choreController = require('../controllers/choreController.js');

module.exports = function(app, express) {
  app.get('/messages/:houseId', function(req, res) {
  });

  app.post('/messages', function(req, res) {

  });

  app.get('/chores/:houseId', choreController.get);

  app.post('/chores', choreController.post);

  app.put('/chores/:choreId', choreController.put);

  app.get('/payment/pay/:userId', paymentController.getPendingBills);

  app.post('/payment', paymentController.postPayment);

  app.get('/payment/owed/:userId', paymentController.getPaymentOwed);

  app.get('payment/completed/userId', paymentController.getPaymentHistory);
}
