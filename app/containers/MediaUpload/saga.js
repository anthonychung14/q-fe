import { call, all, takeLatest } from 'redux-saga/effects';
import CONSTANTS from './constants';

function* postUpload({ fileData }) {
  try {
    console.log(fileData, 'we will post eventually');
  } catch (error) {
    throw new Error(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(CONSTANTS.upload.START, function* startUpload(action) {
      // we need to post to the backend
      // whether through server or straight to transloadit, I don't care lol
      yield call(postUpload, action.payload);
    }),
  ]);
}
