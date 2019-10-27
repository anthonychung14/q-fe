import { Map, List } from 'immutable';

const INIT_STATE = Map({ recentCart: List(), confirming: Map() });

const addToCart = (state, card) => {
  const newCart = state.get('recentCart').push(card);
  const count = state.getIn(['confirming', card.cardId], 0);

  const newConfirming = state.get('confirming').set(card.cardId, count + 1);
  return state.set('recentCart', newCart).set('confirming', newConfirming);
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case 'card/ADD_TO_CONSUME':
      return addToCart(state, action.payload.card);
    case 'card/EMPTY_RECENT_CART':
      return INIT_STATE;
    default:
      return state;
  }
}
