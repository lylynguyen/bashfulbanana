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
    this.getSession();
    return {
      view: 'Messages',
      code: ''
    }
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
        localStorage.setItem('obie', session);
        this.getUserImage();
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
        this.setState({code: "Your house code is: " + code[0].token});
      }.bind(this),
      error: function() {
        console.log('error');
      }
    });
  },
  renderView: function(view) {
    this.setState({view: view});
  },
  render: function() {
    return (
      <div>
        <NavBar {...navbar} changeView={this.renderView} />
        <div className="app-container col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="col-xs-5 col-md-4 col-lg-4 side-bar-container">
            <div className="side-bar-filler">
              <ImageContainer imageUrl={this.state.imageUrl}  />
              <h3>{this.state.name}</h3>
              <button className="btn btn-info submit-message-button text-center" onClick={this.getHouseCode}>Get House Code</button>
              <p>{this.state.code}</p>
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

var Login = React.createClass({
  mixins: [History], 

  login: function(event) {
    event.preventDefault();
    window.localStorage.setItem('userId', this.refs.userId.value);
    window.localStorage.setItem('houseId', this.refs.houseId.value);
    this.history.pushState(null, '/registration');
  },

  render: function() {
    return (
      <form onSubmit={this.login} className="form-group">
        <label htmlFor="userId-input">userId</label>
        <input ref="userId" id="userId-input" className="form-control" type="text" />
        <label htmlFor="userId-input">houseId</label>
        <input ref="houseId" id="userId-input" className="form-control" type="text" />
        <button className="btn btn-success">Login</button>

        <a href="/auth/venmo">Log In with Venmo</a>
      </form>
    )
  }
});

$(".side-bar-filler").css({'height':($(".side-bar-container").height()+'px')});

ReactDOM.render(<App/>, document.getElementById('app'));


