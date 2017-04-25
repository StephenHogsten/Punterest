import React from 'react';
import Redirect from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  if (props.isLoggedIn) {
    return <Redirect to='/' />;
  }
  return (
    <div className='form-body'>
      <input 
        type='text'
        className='username-input'
        required
      />
      <input 
        type='password'
        className='password-input'
        required
      />
      <button
        type='button'
        className='signup-button'  
      >
        Sign Up
      </button>
      <button
        type='button'
        className='login-button'  
      >
        Login
      </button>
    </div>
  )
}
LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired
}

export default LoginForm;