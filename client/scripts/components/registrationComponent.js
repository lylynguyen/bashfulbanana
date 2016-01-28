import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var RegistrationContainer = React.createClass ({
  createHouse: function(event) {
    event.preventDefault();
    var house = {
      name: this.refs.nickname.value
    };
    this.props.addHouse(house);
    this.refs.createHouseForm.reset(); 
  },

  addHouse: function(house) {
    $.ajax({
      url: 'http://localhost:8080/houses',
      type: 'POST',
      data: JSON.stringify(house),
      contentType: 'application/json',
      success: function(houseId) {
        console.log(houseId); 
      }.bind(this)
    })
  },

  findHouse: function(event) {
    event.preventDefault(); 
    //get request for house with provided houseCode
    $.ajax({
      url: 'http://localhost:8080/houses/' + this.refs.houseCode.value,
      type: 'GET',
      contentType: 'application/json',
      success: function(houseId) {
        //if successful, want to call updateUserHouseId
        //with appropriate userId, adding the houseId
        //Need somewhere to store that id when it comes back.
        console.log(houseId); 
        updateUserHouseId(houseId); 
      }.bind(this)
    }); 
    this.refs.joinHouseForm.reset(); 
  },



  updateUserHouseId: function(houseId) {
    var userId = window.localStorage.getItem('userId');
    $.ajax({
      url: 'http://localhost:8080/users/' + userId,
      type: 'PUT',
      data: JSON.stringify(houseId),
      contentType: 'application/json',
      success: function(data) {
        console.log(data); 
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div className='create-house'>
        <h4>Create House</h4>
        <form ref='createHouseForm'>
          Nickname: <input type='text' ref='nickname'/>
          <button>Create</button>
        </form>
        <p> --OR-- </p>
        <form ref='joinHouseForm'>
          Enter House Code: <input type='text' ref='houseCode'/>
          <button>Join</button>
        </form>
      </div>
    )
  }
});



export default RegistrationContainer;

