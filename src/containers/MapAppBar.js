import { connect } from 'react-redux';
import { loginStatusChange, NONE } from '../actions';
import AppBar from '../components/AppBar';

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    onLogoutClick: () => {
      console.log('logout clicked');
      dispatch(loginStatusChange(NONE))
    }
  }
}

const MapAppBar = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AppBar);

export default MapAppBar;