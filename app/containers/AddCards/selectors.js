import get from 'lodash.get';

export const getCombatStylesFromFirebase = state => {
  const firebase = state.get('firebase');
  const combatStyles = get(firebase, ['ordered', 'combatStyles'], []);

  return combatStyles.map(style => ({
    label: get(style, ['value', 'stylename']),
    value: get(style, 'key'),
  }));
};

export const getCombatMovesFromFirebase = state => {
  const firebase = state.get('firebase');
  // get will return null
  return get(firebase, ['ordered', 'combatMove'], []) || [];
};
