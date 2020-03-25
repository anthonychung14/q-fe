import { call, all, takeLatest } from 'redux-saga/effects';
import { Toast } from 'antd-mobile';

import CONSTANTS from './constants';

// TODO: eventually use a resizing service like Transloadit
function* postUpload({ fileData, options }) {
  try {
    const { mutate, contentMakerId } = options;
    // get auth data from the user to determine filepath
    Toast.loading('Uploading...', 60000);
    // set uploading state
    const r = yield call(
      options.firebase.uploadFiles,
      'files',
      fileData,
      'files',
    );

    const { File, downloadURL } = r[0];

    mutate({
      variables: {
        title: File.name,
        link: downloadURL,
        content_maker_id: parseInt(contentMakerId, 10),
      },
    });

    Toast.hide();
    Toast.success('Uploaded!');

    // try to use giphy functions to also assign
    // write the url + record to database
  } catch (error) {
    throw new Error(error);
    Toast.hide();
    Toast.fail('Something went wrong!');
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
