import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import _ from 'lodash';
import get from 'lodash.get';

import { getStoragePath } from 'utils/time';

export const getFirebase = state => state.get('firebase');
export const getAuth = createSelector([getFirebase], fb => fb.auth);
export const getGoogleUID = createSelector([getAuth], auth => auth.uid);

export const connectAuth = connect(state => ({ auth: getAuth(state) }));

export const getIsFirebaseRequesting = createSelector(
  [getFirebase],
  firebase => {
    const requests = get(firebase, 'requesting');
    return Object.keys(requests).some(reqKey => requests[reqKey]);
  },
);

export const getNutritionConsumed = createSelector(
  [getFirebase, getGoogleUID],
  (fb, gUID) => get(fb, `data.nutrition.consumed.${gUID}`, {}),
);

export const getTodayConsumed = createSelector([getNutritionConsumed], c =>
  _.defaultTo(get(c, getStoragePath()), {}),
);
