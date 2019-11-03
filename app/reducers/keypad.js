import { List, Map } from 'immutable';

const INIT_STATE = Map({ startedInput: false, input: List(), fieldName: '' });

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case 'keypad/START_INPUT':
      return state
        .set('startedInput', true)
        .set('fieldName', action.payload.fieldname);
    case 'keypad/INPUT':
      return state.set(
        'input',
        state.get('input').size === 4
          ? state
              .get('input')
              .slice(1)
              .push(action.payload.value)
          : state.get('input').push(action.payload.value),
      );
    case 'keypad/UNDO':
      return state.set('input', List());
    case 'keypad/CONFIRM':
    case 'keypad/CLEAR':
      return INIT_STATE;
    default:
      return state;
  }
}
