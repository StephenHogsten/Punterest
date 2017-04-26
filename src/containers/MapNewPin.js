import { connect } from 'react-redux';
import { 
  FOUND_SUCCESS,
  FOUND_FAILURE,
  FAILURE,
  updateImageUrl,
  foundNewImage,
  fetchSumbitForm
} from '../actions';
import NewPin from '../components/NewPin';
import noImage from '../no_image.png';

const mapStateToProps = (state) => {
  return {
    img_url: state.newPin.img_status === FOUND_FAILURE? noImage: state.newPin.img_url,
    img_status: state.newPin.img_status,
    saving_status: state.newPin.saving_status,
    isNotLoggedIn: state.userHandle === '' && state.loginStatus === FAILURE
  };
}

const mapDispatchToProps = (dispatch, myProps) => {
  return {
    urlOnUpdate: (ev) => dispatch(updateImageUrl(ev.target.value)),
    onLoad: () => dispatch(foundNewImage(FOUND_SUCCESS)),
    onError: () => dispatch(foundNewImage(FOUND_FAILURE)),
    submit: (status, url) => dispatch(fetchSumbitForm(status, url)),
    pushHistory: myProps.history.push
  };
}

const MapNewPin = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPin);

export default MapNewPin;