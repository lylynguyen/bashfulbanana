import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var Notify = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className="message-container">
        <h2 className="text-center">Notify Your Tenants</h2>
        <div className="message-list">
          <p>This is</p>
          <p>Just filler</p>
          <p>Text About</p>
          <p>Notifying</p>
        </div>
      </div>
    )
  }
});

export default Notify;