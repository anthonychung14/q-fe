import moment from 'moment';

export const currentTime = () => {
  return new Date().getTime();
};
/**
 * Returns the current time in seconds
 * @return {number}
 */
export const currentTimeSeconds = () => {
  return Math.round(currentTime() / 1000);
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
    case 'short_date':
      return moment.unix(timestamp).format('M/DD/YY');
    case 'seconds':
      return moment.unix(timestamp).format('M/DD/YY, h:mm:ss a');
    case 'wordy':
      return moment.unix(timestamp).format('MMMM Do, YYYY');
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
