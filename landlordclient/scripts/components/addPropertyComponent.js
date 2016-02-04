import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


var PropertyAdder = React.createClass({
  createHouse: function(event) {
    event.preventDefault();
    var obj = {};
    obj.name = this.refs.houseName.value;
    obj.address = this.refs.address.value;
    console.log(obj, "OB");
    $.ajax({
      url: '/properties/create',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function() {
        this.props.getHousesOwned();
        this.refs.addProp.reset();
      }.bind(this),
      error: function() {
        alert('Error Creating house. Please try again.');
      }
    });
  },
  addProperty: function(event) {
    event.preventDefault();
    $.ajax({
      url: '/properties/add/' + this.refs.houseCode.value,
      type: 'PUT',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function() {
        this.props.getHousesOwned();
        alert("House added Successfully");
        this.refs.claimProp.reset();
      }.bind(this),
      error: function() {
        alert('Error adding house. Please check token.');
      }
    });
  },

  render: function() {
    return (
      <div className="message-container">
        <form ref="addProp" onSubmit={this.createHouse}>
          <h3>Add New Property</h3>
          <input ref="houseName" type="text" placeholder="House Name"/>
          <input ref="address" type="text" placeholder="Address"/>
          <button type="submit">Submit</button>
        </form>
        <form ref="claimProp" onSubmit={this.addProperty}>
          <h3>Manage Existing Property</h3>
          <input ref="houseCode" type="text" placeholder="Add House With Token"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
});



export default PropertyAdder;