import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var ChoreContainer = React.createClass({
  getInitialState: function () {
    this.getUsers();
    this.loadChores();
    return {
      chores: [],
      users: []
    }
  },

  getUsers: function() {
    var token = localStorage.getItem('obie');
    $.ajax({
      //eventually need to replace 1 with houseId. 
      url: 'http://localhost:8080/users/',
      headers: {'token': token},
      type: 'GET',
      contentType: 'application/json',
      success: function(users) {
        console.log('users: ', users);
        this.state.users = users; 
        this.setState({users: this.state.users}); 
      }.bind(this)
    });
  },

  loadChores: function () {
    var houseId = window.localStorage.getItem('houseId'); 
    $.ajax({
      //eventually need to pass in :houseId instead of 1
      url: 'http://localhost:8080/chores/' + houseId,
      headers: {'token': localStorage.getItem('obie')},
      type: 'GET',
      contentType: 'application/json',
      success: function (chores) {
        console.log('CHORES', chores);
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
      headers: {'token': localStorage.getItem('obie')},
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
        <ChoreForm users={this.state.users} formSubmit={this.formSubmit}/>
      </div>
    )
  }
});

var ChoreEntry = React.createClass({
  updateChoreStatus: function () {
    $.ajax({
      url: 'http://localhost:8080/chores/' + this.props.chore.id,
      type: 'PUT',
      headers: {'token': localStorage.getItem('obie')},
      contentType: 'application/json',
      success: function() {
        console.log('update successful')
        this.props.loadChores();
      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    })
  },

  render: function () {
    return (
      <div className="chore-entry">
        <div className="row">
          <div className="col-xs-6 chore-id">
            <p>{this.props.chore.chorename}</p>
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
        <button type='button' onClick={this.updateChoreStatus}>Completed</button>
      </div>
    )
  }
});

var ChoreForm = React.createClass({
  localSubmit: function (event) {
    event.preventDefault();
    var userId = this.refs.userId.value;
    var dueDate = this.refs.dueDate.value;
    var name = this.refs.choreName.value;
    var category = this.refs.category.value;
    var houseId = localStorage.getItem('houseId');
    console.log('USER ID submit', userId);
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
    var userList = this.props.users.map(function(user, index) {   
      return <option key={user.id} value={user.id} username={user.name}>{user.name}</option>
    });
    return (
      <div>
        <form className="message-form form-group" ref='choreForm' onSubmit={this.localSubmit}>
          <label htmlFor="chore-input">Chore Details</label>
          <input type="text" name='chore' className="form-control" ref='choreName' placeholder="Chore"/>
          <div className="chore-div chore-input-left col-xs-4">
          <label htmlFor="user-id">Username</label>
            <select className="form-control username-input" ref='userId'>
              {userList}
            </select>
          </div>
          <div className="chore-div col-xs-4 chore-div-middle">
            <label htmlFor="category">Category</label>
            <select name="category" id="category" className="form-control" ref="category" >
              <option value="kitchen">Kitchen</option>
              <option value="living-room">Living Room</option>
              <option value="yard">Yard</option>
              <option value="laundry-room">Laundry Room</option>
              <option value="bathroom">Bathroom</option>
              <option value="bedroom">Bedroom</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="chore-div chore-input-right col-xs-4">
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
