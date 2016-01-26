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
    <div>

      {this.props.chore.userId}
      {this.props.chore.name}
      {this.props.chore.category}
      {this.props.chore.dueDate}
      <form onSubmit={this.updateChoreStatus}>
        <button type="submit">Completed</button>
      </form>
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

export default ChoreContainer;
