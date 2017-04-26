import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  FOUND_SUCCESS,
  NEW_PIN_SUBMITTED,
  NEW_PIN_SUCCESS,
  NEW_PIN_FAILURE 
} from '../actions';
import '../scss/NewPin.scss';

class NewPin extends Component {
  redirectIfNotLoggedIn(props) {
    if (props.isNotLoggedIn) {
      props.pushHistory('/');
    }
  }
  componentWillMount() {
    this.redirectIfNotLoggedIn(this.props);
  }
  componentWillUpdate(nextProps) {
    this.redirectIfNotLoggedIn(nextProps);
    if (nextProps.saving_status === NEW_PIN_SUCCESS) {
      this.props.pushHistory('/');
    }
  }
  render() {
    let savingComponent;
    switch (this.props.saving_status) {
      case NEW_PIN_SUBMITTED: 
        savingComponent = (
          <div>
            <i className='material-icons spin-icon'>insert_emoticon</i>
          </div>
        );
        break;
      case NEW_PIN_FAILURE:
        savingComponent = (
          <div className='error-message'>
            Saving Failed. Note: one user may not upload the same image twice
          </div>
        );
        break;
      default:
        savingComponent = null;
    }
    return (
      <div className='new-pin'>
        <div className='search-area'>
          <input 
            type='text'
            className='pin-image-url'
            required
            onChange={this.props.urlOnUpdate}
            onKeyDown={(e) => {
              if (e.keyCode === 13) { this.props.submit(this.props.img_status, this.props.img_url) }
            }}
          />
          <button 
            type='button'
            className='submit-button'
            disabled={this.props.img_status !== FOUND_SUCCESS}
            onClick={() => this.props.submit(this.props.img_status, this.props.img_url)}
          >
            Create Pin
          </button>
        </div>
        <img 
          className='pin-image-preview'
          alt='preview'
          src={this.props.img_url}
          onLoad={this.props.onLoad}
          onError={this.props.onError}
        />
        {savingComponent}
      </div> 
    )
  }
}
NewPin.propTypes = {
  img_url: PropTypes.string,
  is_saving: PropTypes.bool,
  is_saved: PropTypes.bool,
  urlOnUpdate: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default NewPin;