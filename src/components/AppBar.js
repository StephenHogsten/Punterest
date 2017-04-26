import React from 'react';
import PropTypes from 'prop-types';
import '../scss/AppBar.scss';

const AppBar = (props) => {
  return (
    <div className='app-bar'>
      <button type='button' onClick={ 
        () => window.open('/api/login')
      }>
        Login
      </button>
      <button type='button' onClick={props.onLogoutClick}>
        Logout
      </button>
    </div>
  )
}
AppBar.propTypes = {
  userHandle: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired
}

export default AppBar;