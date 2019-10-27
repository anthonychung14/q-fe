import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { getStorageDate } from 'utils/time';
import { getActiveMode } from './skill_mode';

const getGoals = state => state.get('goals');
const getCart = state => state.getIn(['cart', 'recentCart']);

export const getGoalsForMode = createSelector(
  [getGoals, getActiveMode],
  (goals, mode) => goals.get(mode),
);

export const getGoalCalories = createSelector([getGoalsForMode], activeGoal =>
  activeGoal.reduce((acc, curr, k) => {
    const multiplier = k === 'fat' ? 9 : 4;
    const final = acc + curr * multiplier;
    return final;
  }, 0),
);

export const connectGoals = connect(state => ({
  activeGoal: getGoalsForMode(state),
  activeMode: getActiveMode(state),
  cart: getCart(state),
  date: getStorageDate(),
  goalCalories: getGoalCalories(state),
}));
