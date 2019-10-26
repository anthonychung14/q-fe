import urls from 'constants/urls';
import { maxAllowableSizes } from './transloaditTemplate';

const { maxSize, maxSizeVideo } = maxAllowableSizes;

export const createExpiresString = () => {
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 1);
  return expiresDate.toISOString();
};

// the order of the keys matters (for the hashing of this JSON string), and the expires token needs to be generated dynamically
// therefore, we are exporting a function. it is mostly constants, thus its location in constants
export const createTransloadit = fileType => ({
  auth: {
    key: process.env.TRANSLOADIT_KEY, // public key (webpack will replace when building)
    expires: createExpiresString(),
    max_size: fileType === 'video' ? maxSizeVideo : maxSize,
    // referer: urls.HOST // need to regex-ify urls.HOST before turning this on
  },
  template_id: process.env.TRANSLOADIT_TEMPLATE_ID,
  notify_url: urls.NOTIFY_CLOUD, // our django endpoint
});
