import * as actions from './actions.js';

function errors(state=[], action) {
  switch (action.type) {
    case actions.NEW_ERROR:
      return state.concat(action.error);
    default:
      return state;
  }
}

function pinStatus(state, action) {
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
      return actions.FETCH_PINS_NONE;
  }
}

function pins(state=[], action) {
  switch (action.type) {
    case actions.FETCH_PINS_SUCCESS:
      // we just got data -> put it in the store
      return action.posts;
    default:
      return state;
  }
}

// combines reducers (will use verbose syntax for now)
export default function rootReducer(state={}, action) {
  return {
    errors: errors(state.errors, action),
    pins: pins(state.pins, action),
    pinStatus: pinStatus(state.pinStatus, action)
  }
}