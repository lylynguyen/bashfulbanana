var passport = require('passport');
var VenmoStrategy = require('passport-venmo').Strategy;
var request = require('request')
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./db/index');
var cors = require('cors');
var user = require('./controllers/userController');
require('dotenv').load();

var Venmo_Client_ID = process.env.venmo_client_ID; 
var Venmo_Client_SECRET = process.env.venmo_client_secret;
var Venmo_Callback_URL = 'http://localhost:8080/auth/venmo/callback';

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'client')));
app.use(cors()); 

app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new VenmoStrategy({
    clientID: Venmo_Client_ID,
    clientSecret: Venmo_Client_SECRET,
    callbackURL: Venmo_Callback_URL
  },
  function(accessToken, refreshToken, venmo, done) {
    // User.findUserByVenmoID(venmo.id, callback);
    var obj= {}
    obj.name = venmo.displayName;
    obj.houseId = 1; //hard coded Change later
    obj.venmoName = venmo.displayName;
    obj.username = venmo.username;
    obj.email = venmo.email;
    obj.provider = venmo.provider;
    obj.venmo = venmo._raw;
    obj.balance = venmo.balance;
    obj.access_token = accessToken;
    obj.refresh_token = refreshToken;
    obj.venmoid = venmo.id;

    
    request.get('http://localhost:8080/users/venmo/'+ venmo.id, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        console.log("get worked!") // Show the HTML for the Google homepage. 
        if (JSON.parse(body).length === 0){
          console.log('in');

        request({
            url: 'http://localhost:8080/users', //URL to hit
            method: 'POST',
            json: obj //Set the body as a string
        }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                console.log(response.statusCode, body);
            }
        });
          
        }
      } else {
        console.log("get failed!");

        return done(err);
      }
    })

    done();
    // console.log("accessToken", accessToken);
    // User.findOne({
    //     'venmo.id': venmo.id
    // }, function(err, user) {
    //     if (err) {
    //         return done(err);
    //     }
    //     // checks if the user has been already been created, if not
    //     // we create a new instance of the User model
    //     if (!user) {
    //         user = new User({
    //             name: venmo.displayName,
    //             username: venmo.username,
    //             email: venmo.email,
    //             provider: 'venmo',
    //             venmo: venmo._json,
    //             balance: venmo.balance,
    //             access_token: accessToken,
    //             refresh_token: refreshToken
    //         });
    //         user.save(function(err) {
    //             if (err) console.log(err);
    //             return done(err, user);
    //         });
    //     } else {
    //         user.balance = venmo.balance;
    //         user.access_token = accessToken;
    //         user.save();
    //         user.venmo = venmo._json
    //         return done(err, user);
    //     }
    // });
  }
));



require('./config/routes.js')(app, express);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = app;