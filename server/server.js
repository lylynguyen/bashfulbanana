var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

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

app.get('/payments/pay/:userId', function(req, res) {

});

app.post('/payments', function(req, res) {

});

app.get('/payments/owed/:userId', function(req, res) {

});

app.get('payments/completed/userId', function(req, res) {

});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
