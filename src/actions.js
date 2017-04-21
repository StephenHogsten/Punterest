import 'whatwg-fetch';

// ----- MISC CONSTANTS -----
export const PINS = 'PINS';

// ----- ACTION TYPES -----
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const NEW_ERROR = 'NEW_ERROR';
export const FETCH_PINS_REQUEST = 'FETCH_PINS_REQUEST';
export const FETCH_PINS_FAILURE = 'FETCH_PINS_FAILURE';
export const FETCH_PINS_SUCCESS = 'FETCH_PINS_SUCCESS';
export const FETCH_PINS_NONE = 'FETCH_PINS_NONE'


// ----- ACTIONS ----- 
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
    return fetch('/api/test/pins.json')
      .then(response => response.json())
      .then((data) => {
        console.log('json', data);
        dispatch(receivePosts(user, data));
      })
      .catch( (err) => {
        console.log('parsing error');
        dispatch(requestFailed(PINS, err));
      });
  } 
}