const INIT_STATE = { searching: false };

const toggleSearch = state => {
  return { ...state, searching: !state.searching };
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case 'search/TOGGLE':
      return toggleSearch(state);
    default:
      return state;
  }
}
