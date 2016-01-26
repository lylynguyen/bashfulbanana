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
        <div className="col-xs-5">
          <NavigationContainer changeView={this.renderView} />
        </div>
        <div className="col-xs-7">
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
  getInitialState: function () {
    this.loadChores();
    return {
      chores: []
    }
  },

  loadChores: function () {
    $.ajax({
      //eventually need to pass in :houseId instead of 1
      url: 'http://localhost:8080/chores/1',
      type: 'GET',
      contentType: 'application/json',
      success: function (chores) {
        this.setState({chores: chores});
      }.bind(this),
      error: function (err) {
        console.log(err);
      }
    })
  },

  formSubmit: function (chore) {
    $.ajax({
      url: 'http://localhost:8080/chores',
      type: 'POST',
      data: JSON.stringify(chore),
      contentType: 'application/json',
      success: function (data) {
        this.loadChores();
      }.bind(this)
    });
  },

  render: function() {
    var choreList = this.state.chores.map(function(item, i) {
      return <ChoreEntry key={i} chore={item} />
    })
    return (
      <div>
        <div className="chore-container">
          <h2 className="text-center">Chores</h2>
          {choreList}
        </div>
        <ChoreForm formSubmit={this.formSubmit}/>
      </div>
    )
  }
});

var ChoreEntry = React.createClass({
  render: function () {
    return (
    <div>
      {this.props.chore.userId}
      {this.props.chore.name}
      {this.props.chore.category}
      {this.props.chore.dueDate}
      <button>Completed</button>
    </div>
    )
  }
});

var ChoreForm = React.createClass({
  localSubmit: function (event) {
    event.preventDefault();
    var userId = this.refs.userId.value;
    var dueDate = this.refs.dueDate.value;
    var name = this.refs.name.value;
    var category = this.refs.category.value;
    var houseId = this.refs.houseId.value;
    var choreObject = {
      userId: userId,
      dueDate: dueDate,
      name: name,
      category: category,
      houseId: houseId
    }
    this.props.formSubmit(choreObject);
    this.refs.choreForm.reset()
  },

  render: function () {
    return (
      <div>
        <form ref='choreForm' onSubmit={this.localSubmit}>
          UserId: <input type='text' name='userId' ref='userId' placeholder='user id'/>
          <input type='text' name='name' ref='name' placeholder='chore Name'/>
          <input type='date' name='dueDate' ref='dueDate' /> 
          <input type='text' name='category' ref='category' placeholder='category' />
          <input type='number' name='houseId' ref='houseId' placeholder='House Id'/> 
          <input type='submit' value='submit'/>
        </form>
      </div>
    )
  }
})


var FinanceContainer = React.createClass({
  getInitialState: function() {
    this.loadBills();
    return {
      bills: [{name: 'water', total: 200, dueDate: 'string'}],
      paymentsOwed: [{paid: false, amount: 300}], 
      history: [{name: 'rent', total: 1250}]
    }
  },

  loadBills: function() {
    $.ajax({
      url: 'http://localhost:8080/payment/pay/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(bills) {
        console.log('BILLS', bills);
        this.setState({bills: bills});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  },

  render: function() {
    var billList = this.state.bills.map(function(item, i) {
      return <BillEntry key={i} bill={item} />
    }); 
    var paymentsOwedList = this.state.paymentsOwed.map(function(item, i) {
      return <PaymentOwedEntry key={i} paymentOwed={item} />
    });
    var historyList = this.state.history.map(function(item, i) {
      return <HistoryEntry key={i} history={item} />
    });
    return (
      <div className="finance-container">
        <h2 className="text-center">Finance</h2>
        <div className='bill-list'>
          <h4 className="text-center">Bills</h4>
          {billList}
        </div>
        <div className='payments-owed-list'>
          <h4 className="text-center">Payments Owed</h4>
          {paymentsOwedList}
        </div>
        <div className='history-list'>
          <h4 className="text-center">History</h4>
          {historyList}
        </div>
        <div className='bill-form'>
          <form action="submit" onSubmit=''>
            Bill Name: <input type="text" refs='name'/>
            Bill Amount: <input type="number" refs='amount'/>
            Bill Due Date: <input type="date" refs='dueDate'/>
          </form>
        </div>
      </div>
    )
  }
});

var BillEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.bill.name}
        {this.props.bill.total}
        {this.props.bill.dueDate}
      </div>
    )
  }
}); 

var PaymentOwedEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.paymentOwed.amount}
      </div>
    )
  }
})

var HistoryEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.history.name}
        {this.props.history.total}
      </div>
    )
  }
})

// var BillList = React.createClass({
//   render: function() {
//     return (
      
//     )
//   }
// })

// var PaymentOwedList = React.createClass({
//   render: function() {
//     return (
      
//     )
//   }
// })

// var HistoryList = React.createClass({
//   render: function() {
//     return (
      
//     )
//   }
// })

ReactDOM.render(<App />, document.querySelector('#app'));