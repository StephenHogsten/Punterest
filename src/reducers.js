import * as actions from './actions.js';
import noImage from './no_image.png';
import 'whatwg-fetch';

function errors(state=[], action) {
  switch (action.type) {
    case actions.NEW_ERROR:
      return state.concat(action.error);
    default:
      return state;
  }
}

function pinsStatus(state=actions.FETCH_PINS_NONE, action) {
  switch (action.type) {
    case actions.FETCH_PINS_REQUEST:
      return actions.FETCH_PINS_REQUEST;
    case actions.FETCH_PINS_SUCCESS:
      return actions.FETCH_PINS_SUCCESS;
    case actions.NEW_ERROR:
      if (action.requestType === actions.PINS) {
        return actions.FETCH_PINS_FAILURE;
      } else { return actions.FETCH_PINS_NONE; }
    default:  
      return state
  }
}

function pins(state=[], action) {
  switch (action.type) {
    case actions.FETCH_PINS_SUCCESS:
      // we just got data -> put it in the store
      return action.posts;
    case actions.BROKEN_IMAGE:
      let newPosts = state.slice();
      newPosts[action.index]['img_url'] = noImage;
      return newPosts;
    default:
      return state;
  }
}

function newPin(state={
  img_url: '',
  img_status: actions.FINDING,
  saving_status: actions.NOT_SUBMITTED
}, action) {
  switch (action.type) {
    // typed in the URL
    case actions.NEW_PIN_TEXT_CHANGE: {
      let temp = Object.assign( {}, state);
      temp.img_url = action.img_url;
      temp.img_status = actions.FINDING;
      temp.saving_status = actions.NOT_SUBMITTED;
      return temp;
    }
    // we decided whether we found it 
    case actions.NEW_PIN_IMAGE_FOUND: {
      let temp = Object.assign( {}, state);
      if (action.img_status === actions.FOUND_FAILURE) {  
        // if we load an image unsuccessfully set it to failure
        temp.img_status = actions.FOUND_FAILURE;
      } else if (action.img_status === actions.FOUND_SUCCESS && state.img_status === actions.FINDING) {
        // if we load an image successfully, make sure it's not the error image before saving
        temp.img_status = actions.FOUND_SUCCESS;
      }
      return temp;
    }
    // we are trying to save it
    case actions.NEW_PIN_SUBMIT: {
      let temp = Object.assign( {}, state);
      temp.saving_status = action.result;
      return temp;
    }
    // navigated to /new anew
    case actions.NEW_PIN_INIT: {
      return state;
    }
    default:
      return state;
  }
}

function loginStatus(state=actions.NOT_SUBMITTED, action) {
  switch (action.type) {
    case actions.LOGIN_STATUS_CHANGE:
      return action.status;
    default:
      return state;
  }
}

function userHandle(state='', action) {
  switch (action.type) {
    case actions.LOGIN_STATUS_CHANGE:
      if (action.status === actions.SUCCESS) {
        // logged in
        console.log('logged in');
        return action.username;
      } else if (action.status === actions.NONE) {
        // logged out
        console.log('logging out');
        fetch('/api/logout', { credentials: 'same-origin' });
        return '';
      } else {
        // anything else
        return state;
      }
    default:
      return state;
  }
}

// combines reducers (will use verbose syntax for now)
export default function rootReducer(state={}, action) {
  return {
    errors: errors(state.errors, action),
    pins: pins(state.pins, action),
    pinsStatus: pinsStatus(state.pinStatus, action),
    newPin: newPin(state.newPin, action),
    loginStatus: loginStatus(state.loginStatus, action),
    userHandle: userHandle(state.userHandle, action)
  }
}