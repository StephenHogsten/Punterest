import { connect } from 'react-redux';
import { 
  fetchUpdateChange,
  declareBrokenLink,
  enableUserFilter
} from '../actions';
import Pins from '../components/Pins';

function getVisiblePins(pins, filterOn, filterUser) {
  console.log('getting visible pins');
  if (!filterUser) return pins;
  if (!filterOn) return pins;
  filterUser = filterUser.toUpperCase();
  return pins.filter( (pin) => pin.uploader.toUpperCase() === filterUser); 
}

const mapStateToProps = (state) => {
  return {
    userHandle: state.userHandle,
    pins: getVisiblePins(state.pins, state.filterOn, state.filterUser)
  }
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    declareBrokenLink: (index) => dispatch(declareBrokenLink(index)),
    onHandleClick: (user) => dispatch(enableUserFilter(user)),
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