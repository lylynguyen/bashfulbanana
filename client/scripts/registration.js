$(document).ready(function() {

  $.ajax({
    url: 'http://localhost:8080/obie/',
    type: 'GET',
    contentType: 'application/json',
    success: function(session) {
      localStorage.setItem('obie', session);
    },
    error: function() {
      console.log('error getting session');
    }
  });

  var addHouse = function(house) {
    $.ajax({
      url: 'http://localhost:8080/houses',
      type: 'POST',
      data: JSON.stringify(house),
      contentType: 'application/json',
      success: function(data) {
        getHouseToken(data.insertId);
      }
    });
  };

  var getHouseToken = function(houseId) {
    $.ajax({
      url: 'http://localhost:8080/houses/token/'+houseId,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        var token = data[0].token; 
        // alert('Your token is ' + token);
        $('#house-code').val(token); 
      },
      error: function(error) {
        console.log('error: ', error);
      }
    });
  };

  var createHouse = function(event) {
    event.preventDefault();
    var house = {
      name: $('#house-name').val()
    };
    addHouse(house);
  };

  var updateUserHouseId = function(houseId) {
    $.ajax({
      url: 'http://localhost:8080/houses/users',
      type: 'PUT',
      headers: {token: localStorage.getItem('obie')},
      data: JSON.stringify({houseId: houseId}),
      contentType: 'application/json',
      success: function(data) {
        window.location.href ='/login';
      },
      error: function(error) {
        console.log('error: ', error);
      }
    })  
  };

  var findHouse = function() {
    // event.preventDefault();
    var houseCode = $('#house-code').val();
    //get request for house with provided houseCode
    $.ajax({
      url: 'http://localhost:8080/houses/' + houseCode,
      type: 'GET',
      contentType: 'application/json',
      success: function(houseId) {
        //if successful, want to call updateUserHouseId
        //with appropriate userId, adding the houseId
        //Need somewhere to store that id when it comes back. 
        updateUserHouseId(houseId[0].id); 
      },
      error: function(error) {
        console.log('error: ', error);
      }
    });
  };

  // create a house
  $('#create-house').on('click', createHouse);


  // join a house
  $('#join-house').on('click', function(event) {
    event.preventDefault()
    findHouse();
  });

});