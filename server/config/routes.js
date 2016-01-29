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
    console.log("REZZ",res.req.session.passport.user);
    console.log("WAA", res.req.session);
    res.redirect("/");
  });

  //Login/Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //Pay a user
  app.post('/auth/venmo/payment', function(req, res){
    //using the request library with a callback
    console.log("BOD:", req.body);
    request.post('https://api.venmo.com/v1/payments', {form: req.body}, function(e, r, venmo_receipt){
        // parsing the returned JSON string into an object
        console.log(venmo_receipt);
        var venmo_receipt = JSON.parse(venmo_receipt);
        console.log("paid successfully")
        res.render('success', {venmo_receipt: venmo_receipt});
    });
});

  //Dummy Test Route
  app.get('/woo', passport.authenticate('venmo', { 
    scope: ['make_payments', 'access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
    failureRedirect: '/',
    successRedirect: '/woo'
  }) , function(req, res){
    res.send("hi guys")
  })

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
  app.get('/houses/:token', houseController.getHousebyHouseId);
  app.put('/users/:userId', houseController.updateUserHouseId); 
}
