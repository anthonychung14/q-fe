import { all, takeLatest, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import CONSTANTS from './constants';

// Root saga
export default function* rootSaga() {
  yield all([
    takeLatest(CONSTANTS.card.ADD_TO_CONSUME, function* handleUpload({
      payload,
    }) {
      // we need to post to the backend
      yield call(delay, 1000);
      // whether through server or straight to transloadit, I don't care lol
      payload.afterTimeout();
    }),
  ]);
}
