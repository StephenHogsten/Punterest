import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Pins from '../components/Pins';

function getVisiblePins(currentUser, pins, filterUserOnly) {
  if (!currentUser) return pins;
  if (!filterUserOnly) return pins;
  return pins.filter( (pin) => pin.uploader === currentUser); 
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    pins: getVisiblePins(state.currentUser, state.pins, state.filterUserOnly)
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    onClick: () => dispatch(fetchPosts(myProps.currentUser))
  }
}

const FilterPins = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pins);

export default FilterPins;