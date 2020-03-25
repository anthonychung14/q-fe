import { Map, List } from 'immutable';

const INIT_STATE = Map({
  recentCart: List.of('SourceContent'),
  confirming: Map(),
});

const doesCardMatch = (item, card) => item === card;

const addToCart = (state, card, options = {}) => {
  const cart = state.get('recentCart');

  if (options.toggle) {
    return state.set('recentCart', List.of(card));
  }

  const newCart = cart.find(i => doesCardMatch(i, card))
    ? cart.filter(i => !doesCardMatch(i, card))
    : cart.push(card);

  const id = card.cardId ? card.cardId : card;
  const count = state.getIn(['confirming', id], 0);

  const newConfirming = state.get('confirming').set(id, count + 1);
  return state.set('recentCart', newCart).set('confirming', newConfirming);
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case 'cart/TOGGLE_ADD_TO_LIST':
    case 'card/ADD_TO_CONSUME':
      return addToCart(state, action.payload.card, action.payload.options);
    case 'card/EMPTY_RECENT_CART':
      return INIT_STATE;
    default:
      return state;
  }
}
