import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, History } from 'react-router';
import { createHistory } from 'history';
import NavBar from './components/navbarComponent'
import HouseInfo from './components/houseInfoComponent'
import Notify from './components/notifyComponent'
import PendingBills from './components/pendingBillComponent'
import PropertyAdder from './components/addPropertyComponent'


var navbar = {};

navbar.landlordLinks = [
  {render: "Bills", text: "Pending Bills"},
  {render: "Communication", text: "Notify"},
  {render: "Info", text: "House Info"}
]

var App = React.createClass({
  getInitialState: function() {
    console.log("in the correct one");
    if (!localStorage.getItem('obie')) {
      this.getSession();
    }
    // setTimeout(this.getHouseCode, 500);
    this.getHousesOwned();
    this.getUsers();
    return {
      view: 'Pending Bills',
      houseCode: '',
      users: [],
      houseName: '',
      isLandlord: true,
      landlordHouses: [{name: "Robot House", address:"123 road lane", id:4}, {name: "Real World House", address:"466 road street", id: 8}, {name: "Full House", address: "69 road lane", id:5}]
    }
  },

  getHousesOwned: function() {
    $.ajax({
      url: '/properties/owned',
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(houses) {
        console.log("HOUSES OWNED", houses);
        this.state.landlordHouses = houses;
        this.setState({landlordHouses: this.state.landlordHouses});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    });
  },

  getUsers: function() {
    $.ajax({
      url: '/users/',
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
        // this.getHouseCode();
        // this.getUsers();
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
        console.log("house code", code);
        this.setState({houseCode: code[0].token});
        this.setState({houseName: code[0].name});
      }.bind(this),
      error: function() {
        console.log('error');
      }
    });
  },
  switchHouseView: function(houseId) {
    console.log("HOUSEIDDDD", houseId);
    $.ajax({
      url: '/properties/view/' + houseId,
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(code) {
        localStorage.setItem('obie', code);
        console.log("GREAT SUCCESS");
        var view = this.state.view;
        this.renderView('Dummy');
        this.renderView(view);
      }.bind(this),
      error: function(err) {
        console.log('error', err);
      }
    });
  },
  toggleHouseCode: function () {
    $('.toggle-house-code').toggle('slow');
  },
  renderView: function(view) {
    console.log('view: ', view);
    this.setState({view: view});
  },
  render: function() {
    var context = this;
    return (
      <div>
        <NavBar {...navbar} isLandlord={this.state.isLandlord} changeView={this.renderView} />
        <div className="app-container col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="col-xs-5 col-md-4 col-lg-4 side-bar-container">
            <div className="side-bar-filler">
              <ImageContainer imageUrl={this.state.imageUrl}  />
              <div>
                <h3>Your Properties</h3>
                <LandlordHouses switchHouseView={this.switchHouseView} houses={this.state.landlordHouses} />
                <button onClick={function(){context.setState({view: "PropertyAdder"})}}>Add House</button>
              </div>
            </div>
          </div>
          <div className="col-xs-7 col-md-8 col-lg-8 interface-container main-bar-container">
            <ContentContainer getHousesOwned={this.getHousesOwned} view={this.state.view} />
          </div>
        </div>
      </div>
    )
  }
});

var LandlordHouses = React.createClass({
  selectHouse: function(house) {
    // console.log(this.props.houseInfo);
    this.props.switchHouseView(house.id);
  },

  render: function() {
    var context = this;
    var houseList = this.props.houses.map(function(house, index) {
      return <li onClick={context.selectHouse.bind(null, house)} key={index} houseInfo={house}>{house.name}</li>
    })
    return (
      <ul className="landlord-house-ul">
        {houseList}
      </ul>
    )
  }
});

var ImageContainer = React.createClass({
  render: function() {
    return <img height="150" src="https://c1.staticflickr.com/3/2670/3754029973_2b521f68bd_z.jpg?zz=1" />
  }
});

var Dummy = React.createClass({
  render: function() {
    return <p>Dummy</p>;
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Pending Bills') {
      return <PendingBills />
    } else if (this.props.view === 'Notify') {
      return <Notify />
    } else if (this.props.view === 'House Info') {
      return <HouseInfo />
    } else if (this.props.view === 'Dummy') {
      return <Dummy />
    } else if (this.props.view === 'PropertyAdder') {
      return <PropertyAdder getHousesOwned={this.props.getHousesOwned} />
    }
  }
});

$(".side-bar-filler").css({'height':($(".side-bar-container").height()+'px')});

ReactDOM.render(<App/>, document.getElementById('app'));


