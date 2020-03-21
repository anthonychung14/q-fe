/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import { AppRegistry } from 'react-native';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
// import * as serviceWorker from './serviceWorker';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/q-logo.png';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

window.addEventListener('DOMContentLoaded', () => {
  const parsedUrl = new URL(window.location);
  // searchParams.get() will properly handle decoding the values.
  console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
  console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
  console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
});

// const csrfToken = document
//   .querySelector('meta[name=csrf-token]')
//   .getAttribute('content');

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://debatermaster.herokuapp.com/graphql',
    // fetchOptions: {
    //   mode: 'no-cors',
    // },
    // headers: {
    //   'X-CSRF-Token': csrfToken,
    // },
  }),
  cache: new InMemoryCache(),
});

const AppComponent = messages => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </ApolloProvider>
);

AppRegistry.registerComponent('App', () => AppComponent);
AppRegistry.runApplication('App', { rootTag: document.getElementById('app') });

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    AppComponent(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => AppComponent(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  AppComponent(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
