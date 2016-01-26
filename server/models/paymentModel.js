var db = require('../db');

module.exports = {
  // money the user owes
  getPendingBills: function (userId, callback) {

    var queryStr = "select * from Bill where userId=" + userId;
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },

   // payments from other users
  getPaymentOwed: function (userId, callback) {

    var queryStr = "select * from Bill left outer join Payment on (bill.id = payment.billId) where bill.userId=" + userId + " and payment.paid=0";
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },
  //user makes a payment
  postPayment: function (params, callback) {

    var queryStr = "insert into Payment(billId, userId, amount, paid, datePaid) values (?, ?, ?, ?, ?)";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },

  // all 'completed' payments, to and from user
  getPaymentHistory: function (userId, callback) {

    var queryStr = "select * from Payment where userId=" + userId + " and paid=1";
    db.query(queryStr, function(err, results) {
      callback(err, results);
    });
  },

  addBill: function (params, callback) {
    var queryStr = "insert into Bill(userId, total, name, dueDate) values (?, ?, ?, ?)";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    })
  }
};
