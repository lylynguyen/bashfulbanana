var messageController = require('../controllers/messageController.js')
var paymentController = require('../controllers/paymentController.js');
var choreController = require('../controllers/choreController.js');

module.exports = function(app, express) {
  //Messages
  app.get('/messages/:houseId', messageController.get);
  app.post('/messages', messageController.post);

  //Chores
  app.get('/chores/:houseId', choreController.get);
  app.post('/chores', choreController.post);
  app.put('/chores/:choreId', choreController.put);

  //Payments
  app.get('/payment/pay/:userId', paymentController.getPendingBills);
  app.post('/payment', paymentController.postPayment);
  app.get('/payment/owed/:userId', paymentController.getPaymentOwed);
  app.get('payment/completed/userId', paymentController.getPaymentHistory);
  app.post('/payment/bills', paymentController.addBill);
}
