// @flow
import EnvironmentVariables from './env_vars';

const Q_ENVIRONMENT = process.env.Q_ENVIRONMENT || 'LOCAL';
const HOST = process.env.API_HOST || 'localhost:7777'; // webpack replaces process.env.API_HOST
const TRANSLOADIT_HOST = process.env.TRANSLOADIT_HOST || HOST; // webpack replaces process.env.API_HOST
// const CONTENT_CDN_ORIGIN = process.env.CONTENT_CDN_ORIGIN;

let UPLOADS;
if (/localhost/.test(TRANSLOADIT_HOST)) {
  UPLOADS = '//localhost:8000/upload';
} else {
  UPLOADS = 'https://media.q.io/assemblies'; // TODO: figure out what this needs to resolve to
}

// const protocol =
//   typeof window !== 'undefined' ? window.location.protocol : 'https';

const urls = Object.freeze({
  HOST,
  API: `//${HOST}/api`,
  NOTIFY_CLOUD: `http://${TRANSLOADIT_HOST}/api/uploads/cloud/`, // must be http if using transloadit proxy
  NOTIFY_SIGNATURE: `//${HOST}/api/uploads/signature/`,
  NOTIFY_CLIENT: `//${HOST}/api/uploads/client/`,
  UPLOADS,
  //   CONTENT_CDN_ORIGIN,
  DOMAIN_NAME: EnvironmentVariables[Q_ENVIRONMENT].domainName,
});

export default urls;
