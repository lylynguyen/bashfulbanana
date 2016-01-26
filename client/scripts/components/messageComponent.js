import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var MessageContainer = React.createClass({
  getInitialState: function() {
    this.loadMessages(); 
    return {
      messages: []
    }
  }, 
  // need to receive 
  // username *** need to query using userId to get username
  // messageText
  // timestamp
  loadMessages: function() {
    $.ajax({
      //eventually need to pass in :houseId instead of 1
      url: 'http://localhost:8080/messages/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(messages) {
        this.setState({messages: messages});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  }, 

  // userId
  // text
  formSubmit: function(message) { 
    console.log('MESSAGE', message);
    $.ajax({
      url: 'http://localhost:8080/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('got here'); 
        this.loadMessages();
      }.bind(this)
    });
  },

  render: function() {
    //this.loadMessages(); 
    console.log('this.state.messages', this.state.messages); 
    var messageList = this.state.messages.map(function(item, i) {
      return <MessageEntry key={i} message={item} />
    })
    return (
      <div className="message-container">
        <h2 className="text-center">Messages</h2>
        <div className="message-list">
          {messageList}
        </div>
        <MessageForm formSubmit={this.formSubmit}/>
      </div>
    )
  }
});

var MessageEntry = React.createClass({
  render: function() {
    return (
      <div className="message-entry">
        <div className="row">
          <div className="col-xs-6 message-username">
            <p>{this.props.message.name}</p>
          </div>
          <div className="col-xs-6 message-timestamp">
            <p>{this.props.message.time.split('T')[0]}</p>
          </div>
        </div>
        <div className="row">
          <div className="message-text">
            <p>{this.props.message.text}</p>
          </div>
        </div>
      </div>
    )
  }
});

var MessageForm = React.createClass({
  localSubmit: function(event) {
    event.preventDefault();
    var username = this.refs.username.value;
    var messageText = this.refs.message.value;
    var messageObj = {
      userId: username,
      text: messageText,
      houseId: 1
    }
    this.props.formSubmit(messageObj);
    this.refs.messageForm.reset()
  },
  randomPlaceholder: function() {
    var placeholders = ["You guys are the worst", "Someone get me the pigeon stick..", "Wash your dishes", "Great Party!", "Who ordered the stripper?", "Where's my dog?", "Someone bring in the mail for me", "Joey at all the pizza", "Obie's dog shit on the floor", "Clean the shit off the floor, Obie"];
    var randomIndex = Math.floor(Math.random()*placeholders.length);
    return placeholders[randomIndex];
  },
  render: function() {
    return (
      <div>
        <form className="message-form form-group" ref='messageForm' onSubmit={this.localSubmit}>
          <label htmlFor="username-input">UserId</label>
          <input id="username-input" className="form-control" type='text' name='username' ref='username'/>
          <label htmlFor="message-input">Message</label>
          <input name="comment" placeholder={this.randomPlaceholder()} className="form-control" id="message-input" ref='message' />
          <button type="submit" className="btn btn-info submit-message-button text-center">Submit</button>
        </form>
      </div>
    )
  }
})

export default MessageContainer;