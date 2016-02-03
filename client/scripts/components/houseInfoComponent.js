import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


var HouseInfo = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className="message-container">
        <h2 className="text-center">House Info</h2>
        <div className="message-list">
          <p>This is</p>
          <p>Just filler</p>
          <p>Text</p>
        </div>
      </div>
    )
  }
});

export default HouseInfo;