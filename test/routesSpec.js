var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
// var UserController = require('../../server/controllers/userControllers.js').createNewUser;
chai.use(chaiHttp);
var app = 'http://localhost:8080';

describe('API Routes', function() {
  describe('user controller', function() {
    it( 'should create a new user', function(done) {
      var newUser = {
        name: "Joey",
        venmoName: "Joey",
        username: "Jballz",
        email: "joey@aol.com",
        provider: "venmo",
        venmo: "{}",
        balance: 33.33,
        access_token: "somelongstring11111",
        refresh_token: "someotherstring9999",
        venmoid: 4444444
      };
      chai.request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
           expect(err).to.be.null;
           expect(res).to.have.status(200);
           done();
        });
    })
  })
})



// require('dotenv').load({path: '../../.env'});
// require('dotenv').load();
// var request = require('supertest');
// var app = require('../../server/server.js');
// var jwt = require('jwt-simple');

// var sampleUser = { userid: 1, houseId: 1, access_token: 'sdfadgainglfuern324789hsfduia'};
// var encodedUser = jwt.encode(sampleUser, process.env.secret_code);


// describe('GET /users', function(){
//   it('respond with json', function(done){
//     request(app)
//       .get('/users')
//       // .set({token:encodedUser})
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   })
// })






