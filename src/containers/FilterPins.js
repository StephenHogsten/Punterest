import { connect } from 'react-redux';
import { fetchUpdateChange, declareBrokenLink } from '../actions';
import Pins from '../components/Pins';

function getVisiblePins(userHandle, pins, filterUserOnly) {
  if (!userHandle) return pins;
  if (!filterUserOnly) return pins;
  userHandle = userHandle.toUpperCase();
  return pins.filter( (pin) => pin.uploader.toUpperCase() === userHandle); 
}

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle,
    pins: getVisiblePins(state.userHandle, state.pins, state.filterUserOnly)
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    declareBrokenLink: (index) => dispatch(declareBrokenLink(index)),
    onFavClick: (user, pinId, isLiked) => {
      if (user) { dispatch(fetchUpdateChange(pinId, !isLiked)) }
    }
  }
}

const FilterPins = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pins);

export default FilterPins;