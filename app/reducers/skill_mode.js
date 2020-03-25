import { Map } from 'immutable';
import { LEVELS } from 'gql/types';

export default function(
  state = Map({
    activeMode: 'view',
    activeLevel: LEVELS[1],
    activeDrawer: null,
  }),
  action,
) {
  switch (action.type) {
    case 'mode/SWITCH':
      return state.set('activeMode', action.payload.mode.toLowerCase());
    case 'mode/SET_ROOT_LEVEL':
      return state.set('activeLevel', action.payload.level);
    case 'mode/SET_MEDIA_DRAWER':
      if (action.payload.drawer === state.get('activeDrawer')) {
        return state.set('activeDrawer', null);
      }
      return state.set('activeDrawer', action.payload.drawer);
    default:
      return state;
  }
}
