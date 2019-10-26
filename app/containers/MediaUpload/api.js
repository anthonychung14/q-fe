/* eslint-disable no-constant-condition */
import axios from 'axios';
import { eventChannel, END } from 'redux-saga';

import urls from 'constants/urls';
import { createTransloadit } from 'utils/transloadit';
import { createRequest, fetchJSON } from 'utils/api';

export const createAssembly = (fields, fileType) => {
  const transloadit = createTransloadit(fileType);
  const assembly = {
    ...transloadit,
    fields,
  };
  return JSON.stringify(assembly);
};

export const makeAssembly = (formData, fields, fileType) => {
  const assemblyStr = createAssembly(fields, fileType);
  formData.append('params', assemblyStr);
  return { formData, assemblyStr }; // return the fields, we want the node_id
};

const { NOTIFY_SIGNATURE, UPLOADS, NOTIFY_CLIENT } = urls;

export const createNotifySignature = assemblyStr =>
  fetchJSON(
    NOTIFY_SIGNATURE,
    createRequest({
      method: 'POST',
      body: {
        assembly_string: assemblyStr,
      },
    }),
  );

export function upload(formData, onProgress) {
  const url = UPLOADS;
  const data = formData;

  const config = {
    onUploadProgress: onProgress,
  };
  return axios.post(url, data, config);
}

export function createUploader(formData) {
  let emit;
  const uploadChannel = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });

  const uploadPromise = upload(formData, event => {
    if (event.loaded === event.total) {
      emit(END);
    }

    emit(event);
  });

  return { uploadPromise, uploadChannel };
}

export const sendToUpload = formData =>
  fetchJSON(UPLOADS, {
    method: 'POST',
    body: formData,
  });

export const notifyClient = body =>
  fetchJSON(
    NOTIFY_CLIENT,
    createRequest({
      method: 'POST',
      body,
    }),
  );
