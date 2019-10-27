import { fromJS } from 'immutable';

const INIT_STATE = fromJS({
  nutrition: {
    protein: 130,
    carbs: 250,
    fat: 75,
  },
  combat: {},
  knowledge: {},
});

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
