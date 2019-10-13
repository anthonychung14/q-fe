import get from 'lodash.get';
import { createSelector } from 'reselect';
import { defaultProps, compose, withProps } from 'recompose';
import { ListView } from 'antd-mobile';

import { getFirebase, getIsFirebaseRequesting } from './firebase';
import { COMBAT_CARD_TYPES } from '../mappers/combat-mappers';

export const getOrderedCombatMoves = createSelector(
  [getFirebase],
  firebase => get(firebase, ['ordered', 'combatMove']) || [],
);

export const getCombatMovesById = createSelector(
  [getFirebase],
  firebase => get(firebase, ['data', 'combatMove']) || {},
);

export const getCombatSequencesById = createSelector(
  [getFirebase],
  firebase => get(firebase, ['data', 'combatSequence']) || {},
);

export const getOrderedCombatSequences = createSelector(
  [getFirebase],
  firebase => get(firebase, ['ordered', 'combatSequence']) || [],
);

export const mapCombatFirebaseToProps = state => ({
  isLoading: getIsFirebaseRequesting(state),
  combatMove: getOrderedCombatMoves(state),
  combatSequence: getOrderedCombatSequences(state),
});

export const getCombatMovesFromFirebase = state => {
  const firebase = state.get('firebase');
  // get will return null
  return get(firebase, ['ordered', 'combatMove'], []) || [];
};

export const getCombatStylesFromFirebase = state => {
  const firebase = state.get('firebase');
  const combatStyles = get(firebase, ['ordered', 'combatStyles'], []);

  return combatStyles.map(style => ({
    label: get(style, ['value', 'stylename']),
    value: get(style, 'key'),
  }));
};

export const getCombatSequencesFromFirebase = state => {
  const firebase = state.get('firebase');
  // get will return null
  return get(firebase, ['ordered', 'combatSequence'], []) || [];
};

export const mapCombatSequenceNames = createSelector(
  [getCombatSequencesFromFirebase],
  sequences =>
    sequences.map(seq => ({
      value: get(seq, 'key'),
      label: get(seq, ['value', 'sequencename']),
    })),
);

export const mapCombatMoveNames = createSelector(
  [getCombatMovesFromFirebase],
  combatMoves =>
    combatMoves.map(move => ({
      label: get(move, ['value', 'movename']),
      value: get(move, 'key'),
    })),
);

export const mapCombatMoveShorthand = createSelector(
  [getCombatMovesFromFirebase],
  combatMoves =>
    combatMoves.map(move => ({
      label: get(move, ['value', 'shorthand']),
      value: get(move, 'key'),
    })),
);

export const mapCombatMovesToOptions = createSelector(
  [mapCombatMoveNames, mapCombatMoveShorthand],
  (names, shorthands) => ({
    nameOptions: names,
    shorthandOptions: shorthands,
  }),
);

export const mapCombatToProps = state => ({
  combatStyleOptions: getCombatStylesFromFirebase(state),
  combatMoveOptions: mapCombatMoveNames(state),
  nameOptions: mapCombatSequenceNames(state),
});

// it should be
export const mapCombatCardsToDataSource = compose(
  defaultProps({
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  }),
  withProps(({ activeIndex = 0 }) => ({
    activeCardType: get(COMBAT_CARD_TYPES, [activeIndex, 'cardName']),
    cardMapper: get(COMBAT_CARD_TYPES, [activeIndex, 'cardMapper']),
  })),
  withProps(
    ({
      activeCardType,
      cardMapper,
      combatMove,
      combatSequence,
      dataSource,
    }) => ({
      dataSource: dataSource.cloneWithRows(
        (activeCardType === 'Move' ? combatMove : combatSequence).map(
          cardMapper,
        ),
      ),
    }),
  ),
);
