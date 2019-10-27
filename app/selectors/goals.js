import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { getActiveMode } from './skill_mode';

const getGoals = state => state.get('goals');

export const getGoalsForMode = createSelector(
  [getGoals, getActiveMode],
  (goals, mode) => goals.get(mode),
);

export const connectGoals = connect(state => ({
  activeGoal: getGoalsForMode(state),
  activeMode: getActiveMode(state),
}));
