import { connect } from 'react-redux';

export const getActiveMode = state =>
  state.getIn(['skillMode', 'activeMode'], 'knowledge');

export const connectActiveMode = connect(state => ({
  activeMode: getActiveMode(state),
}));
