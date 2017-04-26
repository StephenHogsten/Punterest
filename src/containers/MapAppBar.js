import { connect } from 'react-redux';
import { 
  loginStatusChange, 
  enableUserFilter,
  disableUserFilter,
  NONE } from '../actions';
import AppBar from '../components/AppBar';

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    onLogoutClick: () => {
      dispatch(loginStatusChange(NONE));
      dispatch(disableUserFilter());
    },
    enableUserFilter: () => dispatch(enableUserFilter()),
    disableUserFilter: () => dispatch(disableUserFilter())
  }
}

const MapAppBar = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AppBar);

export default MapAppBar;