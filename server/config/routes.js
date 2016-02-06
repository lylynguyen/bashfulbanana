var messageController = require('../controllers/messageController.js')
var paymentController = require('../controllers/paymentController.js');
var choreController = require('../controllers/choreController.js');
var userController = require('../controllers/userController.js');
var houseController = require('../controllers/houseController.js');
var tokenController = require('../controllers/tokenController.js');
var landlordController = require('../controllers/landlordController.js');
var Auth = require('../auth/Auth.js');
var passport = require('passport');
var session = require('express-session');
var jwt = require('jwt-simple');



module.exports = function(app, express) {

  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true
  }));

  app.get('/auth/venmo', passport.authenticate('venmo', {
      session: false,
      scope: ['make_payments', 'access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
      failureRedirect: '/login'
  }), function(req, res) {
    res.render("hi");
  });

  //Passport
  app.get('/auth/venmo/callback', passport.authenticate('venmo', {
      failureRedirect: '/login' //redirect to login eventually
  }), function(req, res) {
    return req.session.regenerate(function() {
      var token = jwt.decode(req.user, process.env.secret_code);
      req.session.jwt = req.user;
      if(!token.houseId) {
        res.redirect('/registration')
      } else if (!token.isLandlord) {
        res.redirect('/');
      } else if (token.isLandlord) {
        res.redirect('/landlord');
      }
    });
  });

  //Users
  app.get('/users/', userController.getUsersInHouse);
  app.get('/users/venmo/:venmoId', userController.findUserByVenmoId);
  app.get('/users/id/:username', userController.getHouseOfUser);
  app.post('/users', userController.postUser);
  app.put('/users', userController.putUser);
  app.get('/users/images', userController.getUserImage);
  //app.get('/users/house', userController.checkIfUserHasHouse)

  //Messages
  app.get('/messages', Auth.isLoggedInUser, messageController.get);
  app.post('/messages', Auth.isLoggedInUser, messageController.post);
  //Landlord Messages
  app.get('/messages/landlord', Auth.isLoggedInUser, messageController.getLandlordChat)
  app.post('/messages/landlord', Auth.isLoggedInUser, messageController.postToLandlordChat)

  //Chores
  app.get('/chores/', Auth.isLoggedInUser, choreController.get);
  app.post('/chores', Auth.isLoggedInUser, choreController.post);
  app.put('/chores/:choreId', Auth.isLoggedInUser, choreController.put);
  app.delete('/chores/:choreId', Auth.isLoggedInUser, choreController.delete);

  //Payments
  app.get('/payment/pay', Auth.isLoggedInUser, paymentController.getWhatYouOwe);
  app.get('/payment/owed', Auth.isLoggedInUser, paymentController.getWhatIsOwedToYou);
  app.get('/payment/completed', Auth.isLoggedInUser, paymentController.getWhatYouHavePaid);
  app.get('/payment/completed/owed', Auth.isLoggedInUser, paymentController.getWhatHasBeenPaidToYou);
  app.post('/payment', Auth.isLoggedInUser, paymentController.postPayment);
  app.post('/payment/bill', Auth.isLoggedInUser, paymentController.postBill);
  app.put('/payment/:paymentId', Auth.isLoggedInUser, paymentController.markPaymentAsPaid);

  //Houses
  app.put('/houses/users', houseController.updateUserHouseId);
  app.get('/houses/:token', houseController.getHousebyHouseId);
  app.post('/houses', houseController.postHouse);
  app.get('/houses/token/:houseId', Auth.isLoggedInUser, houseController.getHouseToken);
  app.get('/housez/code', Auth.isLoggedInUser, houseController.getHouseCode);

  //Landlord
  app.get('/properties/owned', Auth.isLoggedInUser, landlordController.getHousesOwned);
  app.get('/properties/view/:houseId', Auth.isLoggedInUser, landlordController.updateLandlordsCurrentHouse);
  app.put('/properties/add/:houseToken', Auth.isLoggedInUser, landlordController.addProperty);
  app.post('/properties/create', Auth.isLoggedInUser, houseController.createHouse);
  app.put('/property/landlord/house', Auth.isLoggedInUser, landlordController.giveLandlordDummyHouseID);

  app.use('/login', express.static('client/login'));
  app.use('/', express.static('client'));
  app.use('/landlord', express.static('landlordclient'));
  app.use('/registration', express.static('client/registration'));

  app.get('/obie', function(req, res) {
    res.send(req.session.jwt);
  });
  app.get('/obie/updateLeaveHouse', tokenController.updateAfterLeaveHouse);


  app.get('/obie/tokenChange', tokenController.updateToken);

  //Login/Logout
  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });

  //Pay a user
  app.post('/auth/venmo/payment', paymentController.makeVenmoPayment);
}
  
