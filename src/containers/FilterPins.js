import { connect } from 'react-redux';
import { fetchPosts, declareBrokenLink } from '../actions';
import Pins from '../components/Pins';

function getVisiblePins(currentUser, pins, filterUserOnly) {
  if (!currentUser) return pins;
  if (!filterUserOnly) return pins;
  currentUser = currentUser.toUpperCase();
  return pins.filter( (pin) => pin.uploader.toUpperCase() === currentUser); 
}

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle,
    pins: getVisiblePins(state.userHandle, state.pins, state.filterUserOnly)
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    onClick: () => dispatch(fetchPosts(myProps.currentUser)),
    declareBrokenLink: (index) => dispatch(declareBrokenLink(index)),
  }
}

const FilterPins = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pins);

export default FilterPins;