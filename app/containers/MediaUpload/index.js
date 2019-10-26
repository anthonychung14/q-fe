// import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import MediaPicker from 'components/MediaPicker';
import saga from './saga';

import { uploadMedia } from './actions';

// const MediaUpload = props => <MediaPicker />;

export default compose(
  injectSaga({ key: 'MediaUpload', saga, mode: DAEMON }),
  connect(
    null,
    {
      uploadMedia,
    },
  ),
)(MediaPicker);
