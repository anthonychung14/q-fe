import _ from 'lodash';
import { createSelector } from 'reselect';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose, withProps, withStateHandlers } from 'recompose';

import { fetchAirtable } from 'components/ResourceSelector/enhancers';
import { mapObjKeysToCamel } from 'utils/enhancers';

import { NUTRITION_CARD_TYPES } from 'mappers/nutrition-mappers';
import { getFirebase, getIsFirebaseRequesting } from './firebase';

export const getMealsEaten = createSelector(
  [getFirebase],
  firebase => get(firebase, ['data', '']) || {},
);

const mapNutritionFirebaseToProps = state => ({
  isLoading: getIsFirebaseRequesting(state),
  mealsEaten: getMealsEaten(state),
});

const connectNutritionFirebase = connect(mapNutritionFirebaseToProps);

export const withMealRecords = compose(
  firebaseConnect([
    'nutritionMealEaten', // { path: '/todos' } // object notation
  ]),
  connectNutritionFirebase,
);

// converts data into the same format as would be expected by firebase
const mapRecordsToFirebaseCard = withProps(
  ({ activeCardType, records, cardMapper }) => {
    const data = records.list
      .map(({ fields, id }) => ({ ...fields, id }))
      .map(mapObjKeysToCamel);

    const mapped = data
      .map(({ id, ...rest }) => cardMapper({ key: id, value: rest }))
      .filter(i => (activeCardType === 'meal' ? i.isMeal : !i.isMeal));

    return {
      data: mapped,
    };
  },
);

const withFirstNutritionLetters = compose(
  withProps(({ data, search }) => {
    const searchField = data.map(i => _.get(i, 'ingredient'));

    const next = _.uniq(searchField.map(s => s[search.length])).sort();

    return {
      letterKeys: searchField,
      nextLetters: next.concat('CLEAR'),
    };
  }),
);

export const withNutritionCards = compose(
  withProps(({ activeIndex = 0 }) => ({
    activeCardType: get(NUTRITION_CARD_TYPES, [activeIndex, 'cardName']),
    resourceType: get(NUTRITION_CARD_TYPES, [activeIndex, 'cardName']),
    cardMapper: get(NUTRITION_CARD_TYPES, [activeIndex, 'cardMapper']),
  })),
  withStateHandlers(
    { search: '' },
    {
      clearSearch: () => () => ({ search: '' }),
      handleFilterClick: ({ search }) => letter => {
        if (letter === 'CLEAR') return { search: '' };
        return { search: `${search}${letter}` };
      },
    },
  ),
  fetchAirtable,
  mapRecordsToFirebaseCard,
  withFirstNutritionLetters,
);
