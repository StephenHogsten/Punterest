import { connect } from 'react-redux';
import {
  fetchLogin,
  fetchSignup
} from '../actions'
import LoginForm from '../components/LoginForm';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

function mapDispatchToProps(dispatch, myProps) {
  return {
    onLogin: (username, password) => dispatch(fetchLogin(username, password)),
    onSignup: (username, password) => dispatch(fetchSignup(username, password))
  }
}

const MapLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default MapLoginForm;