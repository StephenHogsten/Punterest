import 'whatwg-fetch';

// ----- MISC CONSTANTS -----
export const PINS = 'PINS';          // type of error
export const FINDING = 'FINDING';    // finding statuses
export const FOUND_SUCCESS = 'FOUND_SUCCESS';
export const FOUND_FAILURE = 'FOUND_FAILURE';
export const NOT_SUBMITTED = 'NOT_SUBMITTED';
export const NEW_PIN_SUBMITTED = 'NEW_PIN_SUBMITTED';
export const NEW_PIN_SUCCESS = 'NEW_PIN_SUCCESS';
export const NEW_PIN_FAILURE = 'NEW_PIN_FAILURE';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// ----- ACTION TYPES -----
export const NEW_ERROR = 'NEW_ERROR';

export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export const NEW_PIN_INIT = 'NEW_PIN_INIT';
export const NEW_PIN_TEXT_CHANGE = 'NEW_PIN_TEXT_CHANGE';
export const NEW_PIN_IMAGE_FOUND = 'NEW_PIN_IMAGE_FOUND';
export const NEW_PIN_SUBMIT = 'NEW_PIN_SUBMIT';

export const BROKEN_IMAGE = 'BROKEN_IMAGE';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const FETCH_PINS_REQUEST = 'FETCH_PINS_REQUEST';
export const FETCH_PINS_FAILURE = 'FETCH_PINS_FAILURE';
export const FETCH_PINS_SUCCESS = 'FETCH_PINS_SUCCESS';
export const FETCH_PINS_NONE = 'FETCH_PINS_NONE'

export const LOGIN_STATUS_CHANGE = 'LOGIN_STATUS_CHANGE';


// ----- ACTIONS ----- 
export function declareBrokenLink(index) {
  return {
    type: BROKEN_IMAGE,
    index: index
  };
}

export function initNewPin() {
  return {
    type: NEW_PIN_INIT
  };
}

export function updateImageUrl(img_url) {
  return {
    type: NEW_PIN_TEXT_CHANGE,
    img_url: img_url
  }
}

export function foundNewImage(newStatus) {
  return {
    type: NEW_PIN_IMAGE_FOUND,
    img_status: newStatus
  }
}

export function submitForm(result) {
  return {
    type: NEW_PIN_SUBMIT,
    result: result
  }
}

export function fetchSumbitForm(img_status, img_url) {
  return (dispatch) => {
    if (img_status !== FOUND_SUCCESS) { return; }
    dispatch(submitForm(NEW_PIN_SUBMITTED));
    return fetch('/api/pin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img_url: encodeURIComponent(img_url)
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) { dispatch(submitForm(NEW_PIN_FAILURE)); }
        else { dispatch(submitForm(NEW_PIN_SUCCESS)); }
      })
      .catch(err => dispatch(submitForm(NEW_PIN_FAILURE)) );
  }
}

export function requestFailed(requestType, error) {
  return {
    type: NEW_ERROR,
    error: error,
    requestType: requestType
  }
}

export function requestPosts(user) {
  return {
    type: FETCH_PINS_REQUEST,
    user
  };
}

export function receivePosts(user, json) {
  return {
    type: FETCH_PINS_SUCCESS,
    posts: json,
    receivedAt: Date.now()
  };
}

// thunk to retrieve posts
export function fetchPosts(user) {
  return (dispatch) => {
    dispatch(requestPosts(user));
    return fetch('/api/pins')
      .then(response => response.json())
      .then((data) => {
        dispatch(receivePosts(user, data));
      })
      .catch( (err) => {
        dispatch(requestFailed(PINS, err));
      });
  } 
}

// help function for whether we should get pins
function shouldFetchPosts(state) {
  if (state.pins.length === 0) { return true; }
  return state.pinsStatus === FETCH_PINS_NONE;
}

// thunk to trigger async post retrieval
export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts( getState() )) {
      return dispatch( fetchPosts() );
    } else {
      return Promise.resolve();
    }
  }
}

function submitLogin(status, username) {
  return {
    type: LOGIN_STATUS_CHANGE,
    status: status,
    username: username
  };
}

export function fetchLogin(username, password) {
  return (dispatch) => {
    dispatch(submitLogin(FINDING));
    return fetch('/api/login', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(response => response.json())
      .then(json => {
        if (json.success === false) { dispatch(submitLogin(SUCCESS, json.username)); }
        else { dispatch(submitLogin(FAILURE)); }
      }).catch( err => dispatch(submitLogin(FAILURE)) );
  }
}