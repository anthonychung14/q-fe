import moment from 'moment';
import _ from 'lodash';

export const currentTime = () => {
  return new Date().getTime();
};
/**
 * Returns the current time in seconds
 * @return {number}
 */
export const currentTimeSeconds = () => Math.round(currentTime() / 1000);

export const convertDateToPath = date => date.split('/').join('.');

export const convertToUnixFromDate = string => {
  return moment(string, 'M/DD/YY').unix();
};

export const formatUnixTimestamp = (
  timestamp: number,
  format?: string,
): string => {
  switch (format) {
    case 'from_now':
      return moment.unix(timestamp).fromNow();
    case 'date':
      return moment.unix(timestamp).format('ll');
    case 'storage_date':
      return moment.unix(timestamp).format('YYYY/M/DD');
    case 'shorter_date':
      return moment.unix(timestamp).format('M/DD');
    case 'short_date':
      return moment.unix(timestamp).format('M/DD/YY');
    case 'seconds':
      return moment.unix(timestamp).format('M/DD/YY, h:mm:ss a');
    case 'wordy':
      return moment.unix(timestamp).format('MMMM Do, YYYY');
    case 'x_axis':
      return moment.unix(timestamp).format('M/DD/YY');
    case 'day':
      return moment.unix(timestamp, 'YYYY-MM-DD HH:mm:ss');
    // case 'date_with_seconds':
    //   return (
    //     moment.unix(timestamp).format('ll') +
    //     ' at ' +
    //     moment.unix(timestamp).format('h:mma')
    //   );
    default:
      return moment.unix(timestamp).format('M/DD/YY, h:mm a');
  }
};

export const getNow = format =>
  formatUnixTimestamp(currentTimeSeconds(), format);

export const getShortDate = () =>
  formatUnixTimestamp(currentTimeSeconds(), 'short_date');

export const getStoragePath = () => convertDateToPath(getStorageDate());

export const getStorageDate = item =>
  formatUnixTimestamp(
    _.get(item, 'date_created_timestamp', currentTimeSeconds()),
    'storage_date',
  );

export const getDayFromDate = date => {
  const dt = formatUnixTimestamp(date, 'day');
  return dt.format('dddd');
};

export const getToday = () => getDayFromDate(currentTimeSeconds());
