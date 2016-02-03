import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var pendingBills = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className="message-container">
        <h2 className="text-center">Pending Bills / Rent</h2>
        <div className="message-list">
          <p>This is</p>
          <p>Just filler</p>
          <p>Text About</p>
          <p>$$$$$$$$</p>
        </div>
      </div>
    )
  }
});

export default pendingBills;