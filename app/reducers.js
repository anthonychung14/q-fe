/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { firebaseReducer } from 'react-redux-firebase';

import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import skillModeReducer from 'reducers/skill_mode';
import cartReducer from 'reducers/cart';
import goalsReducer from 'reducers/goals';
import keypad from 'reducers/keypad';
import search from 'reducers/search';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form: formReducer,
    language: languageProviderReducer,
    firebase: firebaseReducer,
    search,
    skillMode: skillModeReducer,
    cart: cartReducer,
    goals: goalsReducer,
    router: connectRouter(history),
    keypad,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  return rootReducer;
}
