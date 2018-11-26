import { createSelector } from 'reselect';
import get from 'lodash.get';

export const getFirebase = state => state.get('firebase');
export const getIsFirebaseRequesting = createSelector(
  [getFirebase],
  firebase => {
    const requests = get(firebase, 'requesting');
    return Object.keys(requests).some(reqKey => requests[reqKey]);
  },
);

export const getOrderedCombatMoves = createSelector(
  [getFirebase],
  firebase => get(firebase, ['ordered', 'combatMove']) || [],
);

export const getCombatMovesById = createSelector(
  [getFirebase],
  firebase => get(firebase, ['data', 'combatMove']) || {},
);
