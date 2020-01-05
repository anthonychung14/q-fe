/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';
import createReducer from './reducers';

// make this not bad
firebase.initializeApp({
  apiKey: 'AIzaSyBYNePtTwiGzLGZiHynWYPG0ukK2QOh14k',
  authDomain: 'provisor-0-1.firebaseapp.com',
  databaseURL: 'https://provisor-0-1.firebaseio.com',
  projectId: 'provisor-0-1',
  storageBucket: 'provisor-0-1.appspot.com',
  messagingSenderId: '740065134914',
  appId: '1:740065134914:web:362a707480c7c98845a0db',
  measurementId: 'G-LL448LHM60',
});

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history), thunk];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
