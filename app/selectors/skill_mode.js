import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, withProps } from 'recompose';

import CARDS from 'constants/cards';
import COLORS from 'constants/colors';

import { getFirebase, getTodayConsumed } from 'selectors/firebase';
import { getStorageDate } from 'utils/time';

export const getActiveMode = state => state.getIn(['skillMode', 'activeMode']);
const getConfirmingCart = state => state.getIn(['cart', 'confirming']);

export const withCardValuesForMode = withProps(({ activeMode }) => ({
  values: _.get(CARDS, activeMode, []),
  tintColor: _.get(COLORS, ['modes', activeMode, 'secondary']),
}));

export const connectActiveMode = connect(state => ({
  activeMode: getActiveMode(state),
  cartConfirming: getConfirmingCart(state),
}));

export const connectActiveSegmentProps = compose(
  connectActiveMode,
  withCardValuesForMode,
);

export const getActiveModeData = createSelector(
  [getActiveMode, getConfirmingCart],
  (activeMode, cartConfirming) => ({
    activeMode,
    cartConfirming,
    tintColor: _.get(COLORS, ['modes', activeMode, 'secondary']),
    values: _.get(CARDS, activeMode, []),
  }),
);

export const getConsumePath = state => {
  const activeMode = getActiveMode(state);
  const storageDate = getStorageDate();

  return `${activeMode}/consumed/${storageDate}`;
};

export const getFirebaseForm = (state, ownProps) => {
  const { form = '' } = ownProps;
  const firebase = getFirebase(state);
  let path = form.split('/');

  if (path.length <= 1) {
    path = getConsumePath(state).split('/');
  }

  return _.get(firebase, ['ordered', ...path], []);
};

export const connectFirebaseForm = connect((state, ownProps) => ({
  firebaseData: getFirebaseForm(state, ownProps),
}));

export const withNutritionRemaining = compose(
  withProps(({ activeGoal, firebaseData, cart, goalCalories, subgoal }) => {
    const totalThusFar = _.reduce(
      firebaseData,
      (acc, { value }) => {
        const lookup =
          subgoal === 'calories'
            ? _.snakeCase([subgoal, 'atwater'])
            : _.snakeCase(['grams', subgoal]);

        return acc + _.get(value, lookup);
      },
      0,
    );

    const totalInCart = cart.reduce((acc, curr) => {
      const key =
        subgoal !== 'calories'
          ? _.camelCase(['grams', subgoal])
          : _.camelCase([subgoal, 'atwater']);

      const next = acc + curr[key];
      return next;
    }, 0);

    return {
      remainingAmount:
        activeGoal.get(subgoal, goalCalories) - totalThusFar - totalInCart,
      unit: subgoal === 'calories' ? 'cal' : 'g',
    };
  }),
);
