import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { fetchPostsIfNeeded, fetchUserIfNeeded } from './actions';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import ScrollToTop from './components/ScrollToTop';
import './scss/index.scss';

let store = createStore(
  rootReducer, 
  applyMiddleware(
    thunk,
    logger
  )
);
store.dispatch(fetchPostsIfNeeded());
store.dispatch(fetchUserIfNeeded());

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <App />
      </Provider>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
