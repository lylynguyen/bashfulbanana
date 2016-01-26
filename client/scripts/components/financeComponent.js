import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var FinanceContainer = React.createClass({
  getInitialState: function() {
    this.loadBills();
    return {
      bills: [{name: 'water', total: 200, dueDate: 'string'}],
      paymentsOwed: [{paid: false, total: 300}], 
      history: [{name: 'rent', total: 1250}]
    }
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
      url: 'http://localhost:8080/payments/bills',
      type: 'POST',
      data: JSON.stringify(bill),
      contentType: 'application/json',
      success: function(data) {
        console.log('got here'); 
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
        <BillForm addBill={this.addBill}/>
      </div>
    )
  }
});

var BillForm = React.createClass({
  splitEvenly: function() {
    //access this.refs.amount.value
    var total = this.refs.amount.value;
    //divide total by number of roommates 
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
      total: this.refs.amount.value,
      name: this.refs.name.value,
      dueDate: this.refs.dueDate.value
    };
    //call addBill with this object. 
    this.props.addBill(bill); 
    //reset input fields
    this.refs.billForm.reset();
  },

  render: function() {
    return (
      <div>
        <h4 className="text-center">Create A New Bill</h4>
        <div className='bill-form'>
          <form action="submit" ref='billForm' onSubmit=''>
            <div className='input'>
              Bill Name: <input type="text" ref='name'/>
              Bill Amount: <input type="number" ref='amount'/>
              Bill Due Date: <input type="date" ref='dueDate'/>
              <button onClick={this.splitEvenly}>Split Evenly</button>
              <p> - OR - </p>
              <ul className='roommates'>
                <li><label><input type="checkbox" name="chk1" id="chk1"/>Justin</label>
                <input type='text'/></li>
                <li><label><input type="checkbox" name="chk2" id="chk2"/>Lyly</label>
                <input type='text'/></li>
                <li><label><input type="checkbox" name="chk3" id="chk3"/>Nick</label>
                <input type='text'/></li>
                <li><label><input type="checkbox" name="chk4" id="chk4"/>Joey</label>
                <input type='text'/></li>
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

export default FinanceContainer;


