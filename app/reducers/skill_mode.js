import { Map } from 'immutable';

export default function(state = Map({ activeMode: 'track' }), action) {
  switch (action.type) {
    case 'mode/SWITCH':
      return state.set('activeMode', action.payload.mode.toLowerCase());
    default:
      return state;
  }
}
