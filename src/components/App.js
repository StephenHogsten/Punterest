import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from '../logo.svg';
import '../scss/App.scss';
import FilterPins from '../containers/FilterPins';
import MapNewPin from '../containers/MapNewPin';
import MapAppBar from '../containers/MapAppBar';

class App extends Component {
  render() {
    if (window.location.pathname === '/login_success') {
      window.opener.location.pathname = '/';
      window.close();
    }
    return (
      <div className="App">
        <MapAppBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Switch>
          <Route exact key='/' path='/' component={FilterPins} />
          <Route exact key='/new' path='/new' component={MapNewPin} />
          <Route exact key='/login_failure' path='/login_failure' render={() => (
            <div className='error-message'>Login Failed</div>
          )} />
          <Route render={() => (
            <div className='error-message'>Invalid path given</div>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
