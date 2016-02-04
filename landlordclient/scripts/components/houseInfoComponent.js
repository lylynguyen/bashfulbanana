import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


var HouseInfo = React.createClass({
  getInitialState: function() {
    return {
      tenants: []
    }
  },
  componentDidMount: function() {
    this.getUsersInHouse();
  },

  getUsersInHouse: function() {
    $.ajax({
      url: '/users',
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(tenants) {
        this.setState({tenants: tenants});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  },

  render: function() {
    var tenantList = this.state.tenants.map(function(tenant) {
      return <User tenant={tenant} />
    });
    return (
      <div className="message-container">
        <h2 className="text-center">House Info</h2>
        <div className="message-list">
          <ul>{tenantList}</ul>
        </div>
      </div>
    )
  }
});

var User = React.createClass({
  render: function() {
    return (
      <li>
        {this.props.tenant.userImageUrl}
        {this.props.tenant.name}
        {this.props.tenant.email}
      </li>
    )
  }
})

export default HouseInfo;