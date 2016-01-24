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

  app.get('/payments/pay/:userId', paymentController.getPendingBills);

  app.post('/payments', function(req, res) {

  });

  app.get('/payments/owed/:userId', function(req, res) {

  });

  app.get('payments/completed/userId', function(req, res) {

  });
}