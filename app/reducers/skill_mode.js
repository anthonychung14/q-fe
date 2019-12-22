import { Map } from 'immutable';

export default function(state = Map({ activeMode: 'security' }), action) {
  switch (action.type) {
    case 'mode/SWITCH':
      return state.set('activeMode', action.payload.mode.toLowerCase());
    default:
      return state;
  }
}
