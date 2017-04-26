import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../scss/AppBar.scss';

const AppBar = (props) => {
  return (
    <div className='app-bar'>
      <p className='app-title' onClick={() => {
        props.disableUserFilter();
        props.history.push('/');
      }} >Punterest</p>
      {props.userHandle? (
        <div className='buttons'>
          <div className='app-bar-button' onClick={props.enableUserFilter}>
            My Pins
          </div>
          <div className='app-bar-button' onClick={() => props.history.push('/new')}>
            New Pin
          </div>
          <div className='app-bar-button' onClick={() => {
            props.onLogoutClick();
            props.history.push('/');
          }}>
            <p>Logout</p>
          </div>
        </div>
      ) : (
        <div className='app-bar-button' onClick={ 
          () => window.open('/api/login')
        }>
          <i className='fa fa-twitter' />
          <p>Login</p>
        </div>
      )}
    </div>
  )
}
AppBar.propTypes = {
  userHandle: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
  enableUserFilter: PropTypes.func.isRequired,
  disableUserFilter: PropTypes.func.isRequired
}

export default withRouter(AppBar);