import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import CARDS from 'constants/cards';
import COLORS from 'constants/colors';

export const getActiveMode = state => state.getIn(['skillMode', 'activeMode']);

export const connectActiveMode = connect(state => ({
  activeMode: getActiveMode(state),
  cartConfirming: state.getIn(['cart', 'confirming']),
}));

export const withCardValuesForMode = withProps(({ activeMode }) => ({
  values: _.get(CARDS, activeMode, []),
  tintColor: _.get(COLORS, ['modes', activeMode, 'secondary']),
}));

export const connectActiveSegmentProps = compose(
  connectActiveMode,
  withCardValuesForMode,
);
