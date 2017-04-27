import { connect } from 'react-redux';
import { 
  fetchUpdateChange,
  declareBrokenLink,
  fetchDeletePin,
  enableUserFilter
} from '../actions';
import Pins from '../components/Pins';

function getVisiblePins(pins, filterUser) {
  if (!filterUser) return pins;
  filterUser = filterUser.toUpperCase();
  return pins.filter( (pin) => pin.uploader.toUpperCase() === filterUser); 
}

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle,
    pins: getVisiblePins(state.pins, state.filterUser)
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    declareBrokenLink: (index) => dispatch(declareBrokenLink(index)),
    onHandleClick: (user) => dispatch(enableUserFilter(user)),
    onFavClick: (user, pinId, isLiked) => {
      if (user) { dispatch(fetchUpdateChange(pinId, !isLiked)) }
    },
    onDeleteClick: (pinId) => dispatch(fetchDeletePin(pinId))
  }
}

const FilterPins = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pins);

export default FilterPins;