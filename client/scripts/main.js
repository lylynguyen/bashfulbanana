import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MessageContainer from './components/messageComponent'
import ChoreContainer from './components/choreComponent'
import FinanceContainer from './components/financeComponent'


var App = React.createClass({
  getInitialState: function() {
    return {
      view: 'Message'
    }
  },
  renderView: function(view) {
    this.setState({view: view});
  },
  render: function() {
    return (
      <div className="app-container">
        <div className="col-xs-5 col-md-4 col-lg-4 interface-container side-bar-container">
          <ImageContainer />
          <NavigationContainer changeView={this.renderView} />
        </div>
        <div className="col-xs-7 col-md-8 col-lg-8 interface-container">
          <ContentContainer view={this.state.view} />
        </div>
      </div>
    )
  }
});

var ImageContainer = React.createClass({
  render: function() {
    return <img src="http://placehold.it/150x150" />
  }
});

var NavigationContainer = React.createClass({
  render: function() {
    return (<div>
        <a href="#"><h3 onClick={this.renderMessage}>Messages</h3></a>
         <a href="#"><h3 onClick={this.renderFinance}>Finance</h3></a>
         <a href="#"><h3 onClick={this.renderChore}>Chores</h3></a>
      </div>
    )
  },
  renderMessage() {
    this.props.changeView('Message');
  },
  renderFinance() {
    this.props.changeView('Finance');
  },
  renderChore() {
    this.props.changeView('Chore');
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Message') {
      return <MessageContainer />
    } else if (this.props.view === 'Chore') {
      return <ChoreContainer />
    } else if (this.props.view === 'Finance') {
      return <FinanceContainer />
    }
  }
});

ReactDOM.render(<App />, document.querySelector('#app'));