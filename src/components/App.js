import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import '../scss/App.scss';
import FilterPins from '../containers/FilterPins';
import MapNewPin from '../containers/MapNewPin';
import MapLoginForm from '../containers/MapLoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button 
          type='button' 
          onClick={ () => window.open('/api/login')}
        >Login</button>
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
          <Route exact key='/login' path='/login' component={MapLoginForm} />
          <Route exact key='/login/callback' path='/login/callback' render={ () => (
            <Redirect to='/api/checkSession' />
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
