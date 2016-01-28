import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, History } from 'react-router';

var RegistrationContainer = React.createClass ({
  mixins: [History],

  //fully working front to back
  createHouse: function(event) {
    event.preventDefault();
    console.log('creating house');
    var house = {
      name: this.refs.nickname.value
    };
    this.addHouse(house);
    this.refs.createHouseForm.reset(); 
  },

  //full working front to back
  addHouse: function(house) {
    $.ajax({
      url: 'http://localhost:8080/houses',
      type: 'POST',
      data: JSON.stringify(house),
      contentType: 'application/json',
      success: function(data) {
        console.log('id of newly added house', data.insertId); 
      }.bind(this)
    })
  },

  //need to add token to schema before can test
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

  //need findHouse to work before can test 
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

  redirectToHouse: function() {
    this.history.pushState(null, '/house');
  },

  render: function() {
    return (
      <div className='create-house'>
        <h4>Create House</h4>
        <form ref='createHouseForm'>
          Nickname: <input type='text' ref='nickname'/>
          <button onClick={this.createHouse}>Create</button>
        </form>
        <p> --OR-- </p>
        <form ref='joinHouseForm'>
          Enter House Code: <input type='text' ref='houseCode'/>
          <button onClick={this.findHouse}>Join</button>
        </form>
        <button onClick={this.redirectToHouse}>House</button>
      </div>
    )
  }
});



export default RegistrationContainer;

