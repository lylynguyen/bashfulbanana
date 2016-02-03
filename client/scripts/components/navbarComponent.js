import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import h from '../helpers';

// create classes
var NavBar = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="navbar-header">
            {/*<NavBrand linkTo={this.props.brand.linkTo} text={this.props.brand.text} />
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse">*/}
            <NavMenu changeView={this.props.changeView} links={this.props.links} />
          </div>
        </div>
      </nav>
    );
  }
});

var NavMenu = React.createClass({
  logout: function() {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('houseId');
    window.location.href = "/logout";
  },
  render: function(){
    var changeView = this.props.changeView;
    var links = this.props.links.map(function(link, i){
      if(link.dropdown) {
        return (
          <NavLinkDropdown links={link.links} key={i} text={link.text} />
        );
      }
      else {
        return (
          <NavLink changeView={changeView} className="flex-children" linkTo={link.linkTo} key={i} text={link.text} render={link.render} />
        );
      }
    });
    return (
      <ul className="nav navbar-nav flexbox">
        <li className="flex-children">
          <img src="../../images/obie_logo.png" height="30px" />
        </li>
        {links}
        <li>
          <a onClick={this.logout}>Logout</a>
        </li>
      </ul>
    );
  }
});

var NavLinkDropdown = React.createClass({
  render: function(){
    var links = this.props.links.map(function(link, i){
      return (
        <NavLink key={i} text={link.text} render={link.render} />
      );
    });
    return (
      <li className="dropdown">
        <a href="#" on className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          {this.props.text}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          {links}
        </ul>
      </li>
    );
  }
});

var NavLink = React.createClass({
  changeView: function() {
    this.props.changeView(this.props.text);
  },
  render: function(){
    return(
      <li className="inner-flex"><a onClick={this.changeView}>{this.props.text}</a></li>
    );
  }
});

// set data
var navbar = {};
navbar.brand = {linkTo: "#", text: "React Bootstrap Navbar"};
navbar.links = [
  {render: "Message", text: "Messages"},
  {render: "Finance", text: "Finances"},
  {render: "Chore", text: "Chores"}
];


export default NavBar;
