import React from 'react';
import PropTypes from 'prop-types';
import { FOUND_SUCCESS } from '../actions';

const NewPin = (props) => {
  console.log('current state');
  console.log(props.img_status);
  console.log(FOUND_SUCCESS);
  return (
    <div className='new-pin'>
      <img 
        className='pin-image-preview'
        alt='preview'
        src={props.img_url}
        onLoad={props.onLoad}
        onError={props.onError}
      />
      <form action='/api/pin' method='post'>
        <input 
          type='text'
          name='img_url' 
          className='pin-image-url'
          required
          onChange={props.urlOnUpdate}
        />
        <button 
          type='submit'
          className='submit-button'
          disabled={props.img_status !== FOUND_SUCCESS}
        >
          Create Pin
        </button>
      </form>
    </div> 
  )
};
NewPin.propTypes = {
  img_url: PropTypes.string,
  is_saving: PropTypes.bool,
  is_saved: PropTypes.bool,
  urlOnUpdate: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default NewPin;