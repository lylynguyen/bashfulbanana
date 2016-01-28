import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var FinanceContainer = React.createClass({
  getInitialState: function() {
    this.loadBills();
    this.getUsers(); 
    this.loadPayments();
    this.loadBillHistory();
    this.loadPaymentHistory();
    var userId = localStorage.getItem('userId');
    this.userId = userId;
    return {
      bills: [],
      // payments: [],
      paymentsOwed: [], 
      billHistory: [],
      paymentHistory: [],
      users: [],
      //eventually need to get real houseId/userId - use Justin's login to query
      //database with userId to get that user's houseId
      houseId: 1,
      userId: userId
    }
  },

  loadBillHistory: function() {
    $.ajax({
      url: 'http://localhost:8080/payment/completed/' + this.userId,
      type: 'GET',
      contentType: 'application/json',
      success: function(bills) {
        this.state.billHistory = bills;
        this.setState({billHistory: this.state.billHistory});
      }.bind(this)
    });
  },

  loadPaymentHistory: function() {
    $.ajax({
      url: 'http://localhost:8080/payment/completed/owed/' + this.userId,
      type: 'GET',
      contentType: 'application/json',
      success: function(payments) {
        this.state.paymentHistory = payments; 
        this.setState({paymentHistory: this.state.paymentHistory}); 
      }.bind(this)
    });
  },

  getUsers: function() {
    $.ajax({
      //eventually need to replace 1 with houseId. 
      url: 'http://localhost:8080/users/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(users) {
        this.state.users = users; 
        this.setState({users: this.state.users}); 
      }.bind(this)
    });
  },

  //addBill is a function that will take a new created bill and post it
  //to the database. However, we don't have that route set up yet,
  //and need to verify schema as well. This should go in finance container. 

  //userId will be the user who created the bill
  //total 
  //name
  //dueDate
  //also need info on who owes what for the bill (checklist)
  
  addBill: function(bill) {
    $.ajax({
      url: 'http://localhost:8080/payment/bill',
      type: 'POST',
      data: JSON.stringify(bill),
      contentType: 'application/json',
      success: function(id) {
        // console.log(data);
        this.createPayments(id)
        this.loadBills();
      }.bind(this)
    });
  },

  addPayment: function(payment) {
    $.ajax({
      url: 'http://localhost:8080/payment',
      type: 'POST',
      data: JSON.stringify(payment),
      contentType: 'application/json',
      success: function(data) {
        // this.loadPayments()
        console.log("payment added");
        // this.loadBills();
      }
    });
  },

  createPayments: function(billId) {
    // event.preventDefault();
    var users = this.state.users;
    //iterate through users
    for(var i = 0; i < users.length; i++) {
      //find the ones selected
      if(users[i].selected === true) {
        //create payment object
        var payment = {
          billId: billId, //need to figure this out
          userId: users[i].id,
          amount: users[i].total
        }
        this.addPayment(payment);
        this.getUsers();
        // console.log(users[i]);
        // console.log('PAYMENT', payment)
      }
    }
  },

  // name
  // total
  // dueDate
  // payee_username
  // payee_userId

  loadBills: function() {
    var userId = localStorage.getItem('userId');
    $.ajax({
      url: 'http://localhost:8080/payment/pay/' + userId,
      type: 'GET',
      contentType: 'application/json',
      success: function(bills) {
        console.log("bills", bills)
        this.state.bills = bills; 
        this.setState({bills: this.state.bills});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  },
  
  loadPayments: function () {
    var userId = localStorage.getItem('userId');
    $.ajax({
      url: 'http://localhost:8080/payment/owed/'+ userId,
      type: 'GET',
      contentType: 'application/json',
      success: function(payments) {
        this.state.paymentsOwed = payments; 
        this.setState({paymentsOwed: this.state.paymentsOwed});
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
    var billHistoryList = this.state.billHistory.map(function(item, i) {
      return <BillHistory key={i} history={item} />
    });
    var paymentHistoryList = this.state.paymentHistory.map(function(item, i) {
      return <PaymentHistory key={i} history={item} />
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
        <div className='bill-history-list'>
          <h4 className="text-center">Bill History</h4>
          {billHistoryList}
        </div>
        <div className='payment-history-list'>
          <h4 className="text-center">Payment History</h4>
          {paymentHistoryList}
        </div>
        <BillForm createPayments={this.createPayments} addPayment={this.addPayment} addBill={this.addBill} users={this.state.users}/>
      </div>
    )
  }
});

var BillEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.bill.billName} $ {this.props.bill.amount} by {this.props.bill.dueDate}
      </div>
    )
  }
}); 

var PaymentOwedEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.paymentOwed.ower} owes you {this.props.paymentOwed.amount} for {this.props.paymentOwed.billName}
      </div>
    )
  }
})

var BillHistory = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.history.billName}
        {this.props.history.amount}
      </div>
    )
  }
})

var PaymentHistory = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.history.paymentName}
        {this.props.history.amount}
      </div>
    )
  }
})

var BillForm = React.createClass({
  getInitialState: function() {
    return {
      splitEvenly: false
    }
  },
  splitEvenly: function(event) {
    event.preventDefault();
    //access this.refs.amount.value
    var amount = this.refs.total.value;
    //divide total by number of roommates 
    var costPerUser = amount/this.props.users.length; 
    //iterate through users
    for(var i = 0; i < this.props.users.length; i++) {
      //set the user total to costPerUser
      this.props.users[i].total = costPerUser;
      //invert selected property
      this.props.users[i].selected = true;
    };
    console.log('USERS', this.props.users);
    this.createBill();
  },
  customSplit: function(event) {
    event.preventDefault();
    var updateSplitEvenly = this.state.splitEvenly ? false : true;
    this.setState({
      splitEvenly: updateSplitEvenly
    });
  },
  createBill: function(event) {
    //prevent default event action
    if (event) {
      event.preventDefault();
    }
    var userId = localStorage.getItem('userId');
    //create bill object based on user input
    var bill = {
      //on top of these, need access to the userId of
      //the person who created and access to all of the
      //users checked on the form and what they owe.
      //think about creating separate payment objects
      //in a different payment function for these. 
      userId: userId,
      total: this.refs.total.value,
      name: this.refs.name.value,
      dueDate: this.refs.dueDate.value
    };
    //call addBill with this object. 
    this.props.addBill(bill); 
    //reset input fields
    this.refs.billForm.reset();
  },

  render: function() {
    var userList = this.props.users.map(function(item, i) {
      item.selected = false; 
      return <UserEntry key={i} user={item} />
    }); 
    return (
      <div className='bill-form'>
        <form action="submit" ref='billForm' className="form-group" onSubmit=''>
          <div className='input'>
            <div className="input-group full-width-input">
              <label htmlFor="bill-name">Bill Name</label>
              <input type="text" id="bill-name" ref='name' className="form-control" />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="bill-amount">Total</label> 
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input type="number" id="bill-amount" ref='total' className="form-control" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="input-group">
                  <label htmlFor="bill-due-date">Due Date</label>
                  <input type="date" id="bill-due-date" ref='dueDate' className="form-control" />
                </div>
              </div>
            </div>
            <button className="btn btn-success btn-left" onClick={this.splitEvenly}>Split Evenly</button>
            <button className="btn btn-success btn-right" onClick={this.customSplit}>Custom Split</button>
            {this.state.splitEvenly ? <CustomSplitForm createBill={this.createBill} userList={userList} users={this.props.users} /> : null}
          </div>
        </form>
      </div>
    )
  }
});

var CustomSplitForm = React.createClass({
  // startBill: function(event) {
  //   event.preventDefault();
  //   var userProps = this.props.users;
  //   var usersPaying = {};
  //   for (var i = 0; i<userProps.length; i++) {
  //     if (this.refs[userProps[user.id]])
  //   }
  //   this.props.createBill();
  // },
  render: function() {
    return (
      <div className="custom-split-container">
        <ul className='split-bill-user-list'>
          {this.props.userList}
        </ul>
        <button className="btn btn-info" onClick={this.props.createBill}>Submit Bill</button>
      </div>
    )
  }
})

var UserEntry = React.createClass({
  setValue: function(id) {
    this.props.user.selected = true;
    this.props.user.total = this.refs[id].value;
    console.log('this.refs[id].value', !this.refs[id].value);
    if (!this.refs[id].value) {
      this.props.user.selected = false;
    }
  },

  render: function() {
    return (
      <li className="split-bill-user-entry">
        <div className="form-group">
          <div className="input-group">
          <label htmlFor="user-split-input">{this.props.user.name}</label>
            <div className="input-group-addon">$</div>
            <input className="form-control" id="user-split-input" onKeyUp={this.setValue.bind(this, this.props.user.id)} ref={this.props.user.id} type='number'/>
          </div>
        </div>
      </li>
    )
  }
})

export default FinanceContainer;