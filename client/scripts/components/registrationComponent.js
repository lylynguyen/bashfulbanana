import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var RegistrationContainer = React.createClass ({
  render: function() {
    return (
      <div className='create-house'>
        <h4>Create House</h4>
        <form>
          Nickname: <input type='text'/>
          <button>Create</button>
        </form>
      </div>
    )
  }
});


export default RegistrationContainer;

