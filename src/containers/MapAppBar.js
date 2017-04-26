import { connect } from 'react-redux';
import {
  logout, 
  enableUserFilter,
  disableUserFilter
} from '../actions';
import AppBar from '../components/AppBar';

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    onLogoutClick: () => dispatch(logout()),
    enableUserFilter: () => dispatch(enableUserFilter()),
    disableUserFilter: () => dispatch(disableUserFilter())
  }
}

const MapAppBar = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AppBar);

export default MapAppBar;