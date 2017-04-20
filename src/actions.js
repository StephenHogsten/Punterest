import fetch from 'whatwg-fetch';

const basePage = 'localhost:300';

export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';



export const CREATE_USER = 'CREATE_USER';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const FETCH_POSTS_REQUEST = 'FETCH_POSTS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export function requestPosts(user) {
  return {
    type: FETCH_POSTS_REQUEST,
    user
  };
}

export function receivePosts(user, json) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts: json,
    receivedAt: Date.now()
  };
}

export function fetchPosts(user) {
  return (dispatch) => {
    dispatch(requestPosts(user));
    return fetch(basePage + '/api/test')
      .then(response => response.json)
      .then(json => dispatch(receivePosts(user, json)));
  } 
}