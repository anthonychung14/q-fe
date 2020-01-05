import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import get from 'lodash.get';

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

export const getNutritionConsumed = createSelector([getFirebase], fb =>
  get(fb, 'data.nutrition.consumed', {}),
);
