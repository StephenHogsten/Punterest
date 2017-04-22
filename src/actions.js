import 'whatwg-fetch';

// ----- MISC CONSTANTS -----
export const PINS = 'PINS';          // type of error
export const FINDING = 'FINDING';    // finding statuses
export const FOUND_SUCCESS = 'FOUND_SUCCESS';
export const FOUND_FAILURE = 'FOUND_FAILURE';

// ----- ACTION TYPES -----
export const NEW_ERROR = 'NEW_ERROR';

export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export const NEW_PIN_TEXT_CHANGE = 'NEW_PIN_TEXT_CHANGE';
export const NEW_PIN_IMAGE_FOUND = 'NEW_PIN_IMAGE_FOUND';
export const NEW_PIN_SUBMIT = 'NEW_PIN_SUBMIT'

export const BROKEN_IMAGE = 'BROKEN_IMAGE';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const FETCH_PINS_REQUEST = 'FETCH_PINS_REQUEST';
export const FETCH_PINS_FAILURE = 'FETCH_PINS_FAILURE';
export const FETCH_PINS_SUCCESS = 'FETCH_PINS_SUCCESS';
export const FETCH_PINS_NONE = 'FETCH_PINS_NONE'


// ----- ACTIONS ----- 
export function declareBrokenLink(index) {
  return {
    type: BROKEN_IMAGE,
    index: index
  };
}

export function updateImageUrl(img_url) {
  return {
    type: NEW_PIN_TEXT_CHANGE,
    img_url: img_url
  }
}

export function foundNewImage(newStatus) {
  console.log('error', newStatus);
  return {
    type: NEW_PIN_IMAGE_FOUND,
    img_status: newStatus
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