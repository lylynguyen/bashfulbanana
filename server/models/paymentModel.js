// var db = require('../db');

module.exports = {
  // money the user owes
  getPendingBills: function (callback) {

    var queryStr = "";
    var testData = [
      {
        id: 1,
        total: 200,
        name: 'water',
        dueDate: new Date(),
        dueDate: new Date(),
        datePaid: null
      },
      {
        id: 4,
        total: 175,
        name: 'electric',
        dueDate: new Date(),
        dueDate: new Date(),
        datePaid: null
      }
    ];
    testData = JSON.stringify(testData);
    // db.query(queryStr, function(err, results) {
      callback(null, testData);
    // });
  },

  // all 'completed' payments, to and from user
  getPaymentHistory: function (callback) {

    var queryStr = "";

    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },

  // payments from other users
  getCompletedPayments: function (callback) {

    var queryStr = "";

    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },

  // Submit/POST payment
  postPayment: function (params, callback) {

    var queryStr = "";

    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
};