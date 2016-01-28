var messageController = require('../controllers/messageController.js')
var paymentController = require('../controllers/paymentController.js');
var choreController = require('../controllers/choreController.js');
var userController = require('../controllers/userController.js');
var houseController = require('../controllers/houseController.js');
var passport = require('passport');

module.exports = function(app, express) {
  app.use('/', express.static('client'));

  //Passport
  app.get('/auth/venmo', passport.authenticate('venmo', {
      scope: ['make_payments', 'access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
      failureRedirect: '/'
  }), function(req, res) {
    res.render("hi");
  });

  app.get('/auth/venmo/callback', passport.authenticate('venmo', {
      failureRedirect: '/' //redirect to login eventually
  }), function(req, res) {
    // console.log("REZZ",res)
    res.redirect("/");
  });

  //Users
  app.get('/users/:houseId', userController.getUsersInHouse);
  app.get('/users/venmo/:venmoId', userController.findUserByVenmoId);
  app.post('/users', userController.postUser);
  app.put('/users', userController.putUser);

  //Messages
  app.get('/messages/:houseId', messageController.get);
  app.post('/messages', messageController.post);

  //Chores
  app.get('/chores/:houseId', choreController.get);
  app.post('/chores', choreController.post);
  app.put('/chores/:choreId', choreController.put);
  app.delete('/chores/:choreId', choreController.delete);

  //Payments
  app.get('/payment/pay/:userId', paymentController.getWhatYouOwe);
  app.get('/payment/owed/:userId', paymentController.getWhatIsOwedToYou);
  app.get('/payment/completed/:userId', paymentController.getWhatYouHavePaid);
  app.get('/payment/completed/owed/:userId', paymentController.getWhatHasBeenPaidToYou);
  app.post('/payment', paymentController.postPayment);
  app.post('/payment/bill', paymentController.postBill);
  app.put('/payment/:paymentId', paymentController.markPaymentAsPaid);

  //Houses
  app.post('/houses', houseController.postHouse);
  app.get('/houses/:token', houseController.getHouseByHouseId);
  app.put('/users/:userId', houseController.updateUserHouseId); 
}
