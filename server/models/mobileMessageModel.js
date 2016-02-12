var db = require('../db');

module.exports = {
  get: function (params, callback) {
    var queryStr = "SELECT Users.name, Users.userImageUrl, Messages.text, DATE_FORMAT(Messages.time,'%W, %M %e, %Y %h:%i %p') AS time FROM Messages LEFT OUTER JOIN Users ON (Messages.userid=Users.id) WHERE Messages.houseId=? AND landlordChat=0 ORDER BY Messages.time DESC LIMIT 50";
    //var queryStr = 'SELECT * from Users'
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  },

  post: function(params, callback) {
    var queryStr = "INSERT INTO Messages (userId, text, houseId, time, landlordChat) VALUES (?, ?, ?, NOW(), 1)"
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  },

  getBillsOwed: function(params, callback) {
    var queryStr = 'SELECT total, name, dueDate from Bill where userId = ?'
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });  
  },

  getPaymentsOwedToYou: function(params, callback) {
    var queryStr = "select Users.name AS ower, Payment.amount, Bill.name AS billName, Bill.dueDate, Bill.id AS billId, Payment.id AS paymentID from Bill left outer join Payment on (Bill.id=Payment.billid) left outer join Users on(Payment.userid=Users.id) where Bill.userId = ? AND Payment.userId <> ? AND Payment.paid=0 ORDER BY Bill.dueDate";
    //var queryStr = "select Users.name AS ower, Payment.amount, Bill.name AS billName, Bill.dueDate, Bill.id AS billId, Payment.id AS paymentID from Bill left outer join Payment on (Bill.id=Payment.billid) left outer join Users on(Payment.userid=Users.id) where Bill.userId = ? AND Payment.userId <> ? AND Payment.paid=0 ORDER BY Bill.dueDate";
    db.query(queryStr, params, function (err, results) {
      callback(err, results);
    });
  }
}


