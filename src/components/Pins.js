import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Pins.scss';
import Masonry from 'react-masonry-component';

const Heart = (props) => {
  return props.filled? (
    <i className="material-icons">favorite</i>
  ) : (
    <i className="material-icons">favorite_border</i>
  )
}
Heart.propTypes = {
  filled: PropTypes.bool.isRequired
};

const OnePin = (props) => {
  return (
    <div className='pin-body'>
      <img 
        src={props.img_url} 
        alt='hilarious' 
        className='pin-image' 
        onError={props.declareBrokenLink}
      />
      <div className='pin-info-box'>
        <p className='uploader'>{props.uploader}</p>
        <div className='favorites'>
          <p className='likes'>{props.likes}</p>
          <Heart filled={props.this_user_likes} />
        </div>
      </div>
    </div>
  );
}
OnePin.propTypes = {
  img_url: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  this_user_likes: PropTypes.bool.isRequired,
  is_saving: PropTypes.bool.isRequired,
  declareBrokenLink: PropTypes.func.isRequired
}

const Pins = (props) => {
  return (
    <div>
      <div 
        className='test-button'
        onClick={props.onClick}
      >
        I am a tester
      </div>
      <Masonry 
        className='pins-body'
      >
        {props.pins.map( (val, index) => (
          <OnePin 
            key={val.uploader + '.' + val.img_url}
            img_url={val.img_url}
            uploader={val.uploader}
            likes={val.likes}
            this_user_likes={val.this_user_likes}
            is_saving={val.is_saving}
            declareBrokenLink={() => props.declareBrokenLink(index)}
          />
        ))}
      </Masonry>
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
  onClick: PropTypes.func.isRequired,
  declareBrokenLink: PropTypes.func.isRequired
};

export default Pins;