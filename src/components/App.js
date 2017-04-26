import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import '../scss/App.scss';
import FilterPins from '../containers/FilterPins';
import MapNewPin from '../containers/MapNewPin';
import MapLoginForm from '../containers/MapLoginForm';

class App extends Component {
  componentWillUpdate() {
    console.log('componenet will update: ', window.location.pathname);
    if (window.location.pathname === '/login_success') {
      console.log('login_success')
      window.opener.location.pathname = '/';
      window.close();
    }
  }
  render() {
    console.log('componenet render: ', window.location.pathname);
    if (window.location.pathname === '/login_success') {
      console.log('login_success')
      window.opener.location.pathname = '/';
      window.close();
    }
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
          <Route exact key='/fake/fake' path='/fake/fake' component={MapLoginForm} />
        </Switch>
      </div>
    );
  }
}

export default App;
