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
        <p 
          className='uploader'
          onClick={props.onHandleClick}
        >{props.uploader}</p>
        <div 
          className='favorites'
          onClick={props.onFavClick}
        >
          <p className='likes'>{props.likes}</p>
          <Heart filled={props.this_user_likes} />
        </div>
      </div>
      {props.showDelete? (
        <div 
          className='delete-button'
          onClick={props.onDeleteClick}
        >Delete Pin</div>
      ) : ( null )}
    </div>
  );
}
OnePin.propTypes = {
  img_url: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  showDelete: PropTypes.bool.isRequired,
  this_user_likes: PropTypes.bool.isRequired,
  is_saving: PropTypes.bool.isRequired,
  declareBrokenLink: PropTypes.func.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onFavClick: PropTypes.func.isRequired
}

const Pins = (props) => {
  let userHandleUpper = props.userHandle.toUpperCase();
  return (
    <Masonry className='pins-body'>
      {props.pins.map( (val, index) => (
        <OnePin 
          key={val.uploader + '.' + val.img_url}
          pinId={val._id}
          img_url={val.img_url}
          uploader={val.uploader}
          likes={val.likes}
          showDelete={val.uploader.toUpperCase() === userHandleUpper}
          this_user_likes={val.this_user_likes}
          is_saving={val.is_saving}
          declareBrokenLink={() => props.declareBrokenLink(index)}
          onHandleClick={() => props.onHandleClick(val.uploader)}
          onDeleteClick={() => props.onDeleteClick(val._id)}
          onFavClick={() => props.onFavClick(props.userHandle, val._id, val.this_user_likes)}
        />
      ))}
    </Masonry>
  );
}
Pins.propTypes = {
  userHandle: PropTypes.string,
  pins: PropTypes.arrayOf(PropTypes.shape({
    img_url: PropTypes.string.isRequired,
    uploader: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    this_user_likes: PropTypes.bool.isRequired,
    is_saving: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onFavClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  declareBrokenLink: PropTypes.func.isRequired,
};

export default Pins;