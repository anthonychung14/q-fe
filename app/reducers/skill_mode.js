import { Map } from 'immutable';

export default function(state = Map({ activeMode: 'knowledge' }), action) {
  switch (action.type) {
    case 'mode/SWITCH':
      return state.set('activeMode', action.payload.mode);
    default:
      return state;
  }
}
