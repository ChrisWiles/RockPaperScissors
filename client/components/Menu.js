import React from 'react';
import {Link, browserHistory} from 'react-router';

import Create from './Create';
import Join from './Join';

import Stats from './Stats';
import PieChart from './PieChart';
import Chatbox from './Chatbox.jsx';
import * as db from '../models/menu';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      accessCode: '',
      username  : '',
      view      : 'menu'
    };
  }

  // two-way binding for access code input
  handleAccessCodeChange(e) {
    this.setState({
      accessCode: e.currentTarget.value
    });
  }

  // two-way binding for username input
  handleUsernameChange(e) {
    this.setState({
      username: e.currentTarget.value
    });
    localStorage.username = e.currentTarget.value;
  }

  handleViewChange(view, e) {
    e.preventDefault();
    this.setState({
      view: view
    });
  }
  // show buttons based on view in state
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Link to="/stats">
              <button className="btn btn-default statsButton">Stats</button>
            </Link>
            <div >
              <h1>The Rock Shop</h1>
              {/*To fix: users log in to see their profiles*/}
              <hr/> {
                this.state.view === 'menu'
                  ? <div className="button-container">
                      <button className="btn btn-default" onClick={this.handleViewChange.bind(this, 'create')}>New Game</button>
                      <button className="btn btn-default" onClick={this.handleViewChange.bind(this, 'join')}>Join Game</button>
                    </div>
                  : this.state.view === 'create'
                    ? <Create
                        username={this.state.username}
                        handleUsernameChange={this.handleUsernameChange.bind(this)}
                        handleViewChange={this.handleViewChange.bind(this)}/>
                    : this.state.view === 'join'
                      ? <Join
                          username={this.state.username}
                          accessCode={this.state.accessCode}
                          handleUsernameChange={this.handleUsernameChange.bind(this)}
                          handleAccessCodeChange={this.handleAccessCodeChange.bind(this)}
                          handleViewChange={this.handleViewChange.bind(this)}/>
                      : null
              }
              <hr/>
              <Chatbox/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
