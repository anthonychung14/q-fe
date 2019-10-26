import { get as _get } from 'lodash';
import { Map } from 'immutable';

import { maxAllowableSizes } from 'utils/transloaditTemplate';
import { stringOf } from 'utils/get-of-type';
import actionTypes from './constants';

const { maxSize, maxSizeVideo } = maxAllowableSizes;

// const maxSize = 209715200; // 200mb
// const maxSizeVideo = 31457280; // 30mb

const schemaMap = {
  image: 'ImageContent',
  video: 'VideoContent',
};

const getMimeTypeData = mimeType => {
  const mimeTypeList = mimeType.split('/');
  const mediaType = _get(mimeTypeList, 0, null);

  return Map({
    mediaType,
    schemaName: schemaMap[mediaType],
    ext: _get(mimeTypeList, 1, ''),
  });
};

export const throwExceededFileSizeError = () => dispatch =>
  dispatch({
    type: actionTypes.uploads.INVALID,
    payload: 'MAX_SIZE_EXCEEDED',
    error: true,
  });

export const uploadMedia = (fileData: Array<*>, options: Object = {}) => (
  dispatch: Function,
) => {
  const fileDataArray = Array.from(fileData);

  const { fileSizeExceeded, invalidFileType } = fileDataArray.reduce(
    (results, { size, type }) => {
      // getMimeTypeData defaults mediaType to 'image' if cannot find type
      const fileType = stringOf(
        getMimeTypeData(type).get('mediaType', 'image'),
      );
      const individualFileExceeds =
        size > maxSize || (fileType === 'video' && size > maxSizeVideo);

      if (individualFileExceeds) {
        return {
          ...results,
          invalidFileType: fileType,
          fileSizeExceeded: true,
        };
      }

      return results;
    },
    {},
  );

  // Templates for transloadit assemblies influence our payload limits. TBC until people ask for more
  if (fileSizeExceeded) {
    return dispatch(throwExceededFileSizeError(invalidFileType));
  }

  return dispatch({
    type: actionTypes.upload.START,
    payload: {
      fileData: fileDataArray,
      options,
    },
  });
};
