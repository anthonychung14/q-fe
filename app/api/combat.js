import { movesDb } from 'firebase/db';
import { createAction } from 'redux-actions';
import actionTypes from 'constants/actionTypes';

export const startFetch = createAction(actionTypes.moves.fetch.START);
export const startCreate = createAction(actionTypes.moves.create.START);

export const fetchMoves = () => async dispatch => {
  movesDb.on('value', snapshot => {
    dispatch({
      type: actionTypes.moves.fetch.SUCCESS,
      payload: snapshot.val() || {},
    });
  });
};
