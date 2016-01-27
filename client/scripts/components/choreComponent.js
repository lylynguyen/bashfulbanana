import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
      }.bind(this),
      error: function(err){
        console.log("error");
      }

    });
  },

  render: function() {
    var context = this;
    var choreList = this.state.chores.map(function(item, i) {
      return <ChoreEntry loadChores={context.loadChores} key={i} chore={item} />
    })
    return (
      <div className="chore-container">
        <h2 className="text-center chore-header">Chores</h2>
        <div className="chore-list">
          {choreList}
        </div>
        <ChoreForm formSubmit={this.formSubmit}/>
      </div>
    )
  }
});

var ChoreEntry = React.createClass({
  updateChoreStatus: function () {
    $.ajax({
    url: 'http://localhost:8080/chores/' + this.props.chore.id,
    type: 'PUT',
    contentType: 'application/json',
    success: function() {
      this.props.loadChores();
    }.bind(this),
    error: function(err) {
      console.log(err);
    }
  })
},

  render: function () {
    // console.log('this.props', this.props.chore);
    return (
      <div className="chore-entry">
        <div className="row">
          <div className="col-xs-6 chore-id">
            <p>{this.props.chore.userId}</p>
          </div>
          <div className="col-xs-6 chore-duedate">
            <p>{this.props.chore.dueDate}</p>
          </div>
        </div>
        <div className="row">
          <div className="chore-text">
            <p>{this.props.chore.name}</p>
          </div>
        </div>
      </div>
    )
  }
});

var ChoreForm = React.createClass({
  localSubmit: function (event) {
    event.preventDefault();
    var userId = 1;
    var dueDate = this.refs.dueDate.value;
    var name = 'name';
    var category = 'other';
    var houseId = 1;
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
        <form  className="message-form form-group" ref='choreForm' onSubmit={this.localSubmit}>
          <label htmlFor="chore-input">Chore Details</label>
          <input type="text" name='chore' className="form-control" ref='name' placeholder="Chore"/>
          <div className="chore-div chore-input-left">
          <label htmlFor="user-id">Username</label>
            <select className="form-control username-input" ref='userId'>
              <option value="username1">username1</option>
            </select>
          </div>
          <div className="chore-div chore-input-right">
            <label htmlFor="due-date">Due Date</label>
            <input type="date" className="form-control" ref='dueDate' />
          </div>
          <div>
            <button className="btn btn-info submit-message-button text-center" type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
})

export default ChoreContainer;
