import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function() {
    return {
      view: 'Message'
    }
  },
  renderView: function(view) {
    this.setState({view: view});
  },
  render: function() {
    return (
      <div className="app-container">
        <div className="col-sm-5">
          <NavigationContainer changeView={this.renderView} />
        </div>
        <div className="col-sm-7">
          <ContentContainer view={this.state.view} />
        </div>
      </div>
    )
  }
});

var NavigationContainer = React.createClass({
  render: function() {
    return (<div>
        <a href="#"><h3 onClick={this.renderMessage}>Messages</h3></a>
         <a href="#"><h3 onClick={this.renderFinance}>Finance</h3></a>
         <a href="#"><h3 onClick={this.renderChore}>Chores</h3></a>
      </div>
    )
  },
  renderMessage() {
    this.props.changeView('Message');
  },
  renderFinance() {
    this.props.changeView('Finance');
  },
  renderChore() {
    this.props.changeView('Chore');
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Message') {
      return <MessageContainer />
    } else if (this.props.view === 'Chore') {
      return <ChoreContainer />
    } else if (this.props.view === 'Finance') {
      return <FinanceContainer />
    }
  }
});

var MessageContainer = React.createClass({
  getInitialState: function() {
    this.loadMessages(); 
    return {
      messages: []
    }
  }, 

  loadMessages: function() {
    $.ajax({
      //eventually need to pass in :houseId instead of 1
      url: 'http://localhost:8080/messages/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(messages) {
        console.log(messages);
        this.setState({messages: messages});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  }, 

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
        // this.state.messages.push(message);
        // this.setState({messages: this.state.messages});
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
      <div>
        <div className="message-container">
          <h2 className="text-center">Messages</h2>
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
      <div>
        {this.props.message.userId}
        {this.props.message.text}
        {this.props.message.houseId}
      </div>
    )
  }
});

var MessageForm = React.createClass({
  localSubmit: function(event) {
    event.preventDefault();
    console.log('test');
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

  render: function() {
    return (
      <div>
        <form ref='messageForm' onSubmit={this.localSubmit}>
          UserId: <input type='text' name='username' ref='username'/>
          <textarea name="comment" id="messageInput" cols="30" rows="10" ref='message'>
          </textarea>
          <input type="submit" value='submit'/>
        </form>
      </div>
    )
  }
})

var ChoreContainer = React.createClass({
  render: function() {
    return (
      <div className="chore-container">
        <h2 className="text-center">Chores</h2>

      </div>
    )
  }
});

var FinanceContainer = React.createClass({
  render: function() {
    return (
      <div className="finance-container">
        <h2 className="text-center">Finance</h2>

      </div>
    )
  }
});

var BillEntry = React.createClass({
  render: function() {
    return (
      <div>
      </div>
    )
  }
)}

var PaymentOwedEntry = React.createClass({
  render: function() {
    return (
      
    )
  }
)}

var HistoryEntry = React.createClass({
  render: function() {
    return (
      
    )
  }
)}

var BillList = React.createClass({
  render: function() {
    return (
      
    )
  }
)}

var PaymentOwedList = React.createClass({
  render: function() {
    return (
      
    )
  }
)}

var HistoryList = React.createClass({
  render: function() {
    return (
      
    )
  }
)}

ReactDOM.render(<App />, document.querySelector('#app'));