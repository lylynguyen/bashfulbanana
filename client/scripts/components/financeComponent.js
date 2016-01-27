import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var FinanceContainer = React.createClass({
  getInitialState: function() {
    this.loadBills();
    this.getUsers(); 
    return {
      bills: [],
      paymentsOwed: [{paid: false, total: 300}], 
      history: [{name: 'rent', total: 1250}],
      users: [],
      //eventually need to get real houseId/userId - use Justin's login to query
      //database with userId to get that user's houseId
      houseId: 1,
      userId: 1
    }
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
    console.log('MESSAGE', bill);
    $.ajax({
      url: 'http://localhost:8080/payment/bill',
      type: 'POST',
      data: JSON.stringify(bill),
      contentType: 'application/json',
      success: function(data) {
        this.loadBills();
      }.bind(this)
    });
  },

  // name
  // total
  // dueDate
  // payee_username
  // payee_userId

  loadBills: function() {
    $.ajax({
      url: 'http://localhost:8080/payment/owed/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(bills) {
        this.state.bills = bills; 
        this.setState({bills: this.state.bills});
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
        <BillForm addBill={this.addBill} users={this.state.users}/>
      </div>
    )
  }
});

var BillForm = React.createClass({
  splitEvenly: function() {
    //access this.refs.amount.value
    var total = this.refs.amount.value;
    //divide total by number of roommates 
    var costPerUser = total/this.props.user.length; 
    //return the cost per user
    return costPerUser; 
  },

  createBill: function(event) {
    //prevent default event action
    event.preventDefault();
    //create bill object based on user input
    var bill = {
      //on top of these, need access to the userId of
      //the person who created and access to all of the
      //users checked on the form and what they owe.
      //think about creating separate payment objects
      //in a different payment function for these. 
      userId: 1,
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
      <div>
        <h4 className="text-center">Create A New Bill</h4>
        <div className='bill-form'>
          <form action="submit" ref='billForm' onSubmit=''>
            <div className='input'>
              Bill Name: <input type="text" ref='name'/>
              Bill Amount: <input type="number" ref='total'/>
              Bill Due Date: <input type="date" ref='dueDate'/>
              <button onClick={this.splitEvenly}>Split Evenly</button>
              <p> - OR - </p>
              <ul className='roommates'>
                {userList}
              </ul>
            </div>
            <div className='submission'>
              <button onClick={this.createBill}>Submit Bill</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
})

var BillEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.bill.billName}
        {this.props.bill.amount}
        {this.props.bill.dueDate}
      </div>
    )
  }
}); 

var UserEntry = React.createClass({
  toggleSelected: function(id) {
    this.props.user.selected = !this.props.user.selected;
    this.props.user.total = this.refs[id].value; 
  },

  render: function() {
    return (
      <li><label><input onChange={this.toggleSelected.bind(this, this.props.user.id)} type="checkbox" name={this.props.user.id} id={this.props.user.id}/>
      {this.props.user.name}</label><input ref={this.props.user.id} type='text'/></li>
    )
  }
})

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

export default FinanceContainer;


