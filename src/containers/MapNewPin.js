import { connect } from 'react-redux';
import { 
  FOUND_SUCCESS,
  FOUND_FAILURE,
  updateImageUrl,
  foundNewImage
} from '../actions';
import NewPin from '../components/NewPin';
import noImage from '../no_image.png';

const mapStateToProps = (state) => {
  return {
    img_url: state.newPin.img_status === FOUND_FAILURE? noImage: state.newPin.img_url,
    img_status: state.newPin.img_status,
    is_saving: state.newPin.is_saving,
    is_saved: state.newPin.is_saved,
  };
}

const mapDispatchToProps = (dispatch, myProps) => {
  console.log('IS THERE ', FOUND_FAILURE);
  return {
    urlOnUpdate: (ev) => dispatch(updateImageUrl(ev.target.value)),
    onLoad: () => dispatch(foundNewImage(FOUND_SUCCESS)),
    onError: () => dispatch(foundNewImage(FOUND_FAILURE))
  };
}

const MapNewPin = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPin);

export default MapNewPin;