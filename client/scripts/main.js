import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, History } from 'react-router';
import { createHistory } from 'history';
import MessageContainer from './components/messageComponent'
import ChoreContainer from './components/choreComponent'
import FinanceContainer from './components/financeComponent'
//import RegistrationContainer from './components/registrationComponent'
import NavBar from './components/navbarComponent'

var navbar = {};
navbar.links = [
  {render: "Message", text: "Messages"},
  {render: "Finance", text: "Finances"},
  {render: "Chore", text: "Chores"}
];

var App = React.createClass({
  getInitialState: function() {
    if (!localStorage.getItem('obie')) {
      this.getSession();
    }
    this.getHouseCode();
    this.getUsers();
    return {
      view: 'Messages',
      houseCode: '',
      users: [],
      houseName: ''
    }
  },

  getUsers: function() {
    $.ajax({
      //eventually need to replace 1 with houseId. 
      url: 'http://localhost:8080/users/',
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(users) {
        console.log('getting users: ', users);
        this.state.users = users; 
        this.setState({users: this.state.users}); 
      }.bind(this)
    });
  },

  getUserImage: function() {
     $.ajax({
      url: '/users/images',
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(url) {
        this.state.imageUrl = url[0].userImageUrl || "https://s-media-cache-ak0.pinimg.com/736x/fb/e1/cd/fbe1cdbc1b728fbb5e157375905d576f.jpg";
        this.state.name = url[0].name;
        this.setState({imageUrl: this.state.imageUrl, name: this.state.name});
      }.bind(this),
      error: function() {
        console.log('error getting image');
      }
    });
  },

  getSession: function() {
    localStorage.removeItem('obie');
    $.ajax({
      url: '/obie/',
      type: 'GET',
      contentType: 'application/json',
      success: function(session) {
        console.log('session: ', session);
        localStorage.setItem('obie', session);
        this.getUserImage();
        this.getHouseCode();
        this.getUsers();
      }.bind(this),
      error: function() {
        console.log('error getting session');
      }
    });
  },

  getHouseCode: function() {
    $.ajax({
      url: '/housez/code',
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(code) {
        this.setState({houseCode: code[0].token});
        this.setState({houseName: code[0].name});
      }.bind(this),
      error: function() {
        console.log('error');
      }
    });
  },
  toggleHouseCode: function () {
    $('.toggle-house-code').toggle('slow');
  },
  renderView: function(view) {
    this.setState({view: view});
  },
  render: function() {
    var roommates = this.state.users.map(function(user, index) {
      return (
        <li key={index} className="username-sidebar">
          <span><img height="30" src={user.userImageUrl} /></span>  <p className="lead">  {user.name}</p>
        </li>
      )
    });
    return (
      <div>
        <NavBar {...navbar} changeView={this.renderView} />
        <div className="app-container col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="col-xs-5 col-md-4 col-lg-4 side-bar-container">
            <div className="side-bar-filler">
              <ImageContainer imageUrl={this.state.imageUrl}  />
              <h3>{this.state.houseName}</h3>
              <ul className="sidebar-roommate-ul">
                {roommates}
              </ul>
              <button className="btn btn-info submit-message-button text-center" onClick={this.toggleHouseCode}>Get House Code</button>
              <p className="toggle-house-code">Your house code is: {this.state.houseCode}</p>
            </div>
          </div>
          <div className="col-xs-7 col-md-8 col-lg-8 interface-container main-bar-container">
            <ContentContainer view={this.state.view} />
          </div>
        </div>
      </div>
    )
  }
});

var ImageContainer = React.createClass({
  render: function() {
    return <img height="150" src="https://c1.staticflickr.com/3/2670/3754029973_2b521f68bd_z.jpg?zz=1" />
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Messages') {
      return <MessageContainer />
    } else if (this.props.view === 'Chores') {
      return <ChoreContainer />
    } else if (this.props.view === 'Finances') {
      return <FinanceContainer />
    }
  }
});

$(".side-bar-filler").css({'height':($(".side-bar-container").height()+'px')});

ReactDOM.render(<App/>, document.getElementById('app'));


