import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Pins.scss';

const Pins = (props) => {
  return (
    <div>
      <div 
        className='test-button'
        onClick={props.onClick}
      >
        I am a tester
      </div>
      <p>
        {props.pins.map( (val) => JSON.stringify(val) )}
      </p>
    </div>
  );
}

Pins.propTypes = {
  pins: PropTypes.arrayOf(PropTypes.shape({
    img_url: PropTypes.string.isRequired,
    uploader: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    this_user_likes: PropTypes.bool.isRequired,
    is_saving: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pins;