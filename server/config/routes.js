var messageController = require('../controllers/messageController.js')
var paymentController = require('../controllers/paymentController.js');
var choreController = require('../controllers/choreController.js');
var userController = require('../controllers/userController.js');

module.exports = function(app, express) {
  //Users
  app.get('/users/:houseId', userController.getUsersInHouse);

  //Messages
  app.get('/messages/:houseId', messageController.get);
  app.post('/messages', messageController.post);

  //Chores
  app.get('/chores/:houseId', choreController.get);
  app.post('/chores', choreController.post);
  app.put('/chores/:choreId', choreController.put);

  //Payments
  app.get('/payment/pay/:userId', paymentController.getWhatYouOwe);
  app.get('/payment/owed/:userId', paymentController.getWhatIsOwedToYou);
  app.get('/payment/completed/:userId', paymentController.getWhatYouHavePaid);
  app.get('/payment/completed/owed/:userId', paymentController.getWhatHasBeenPaidToYou);
  app.post('/payment', paymentController.postPayment);
  app.post('/payment/bill', paymentController.postBill);
  app.put('/payment/:paymentId', paymentController.markPaymentAsPaid);
}
