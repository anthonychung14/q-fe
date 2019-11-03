import _ from 'lodash';
import { createSelector } from 'reselect';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { ListView } from 'antd-mobile';
import { firebaseConnect } from 'react-redux-firebase';

import { compose, withProps, defaultProps } from 'recompose';
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

export const withNutritionCards = compose(
  withProps(({ activeIndex = 0 }) => ({
    activeCardType: get(NUTRITION_CARD_TYPES, [activeIndex, 'cardName']),
    resourceType: get(NUTRITION_CARD_TYPES, [activeIndex, 'cardName']),
    cardMapper: get(NUTRITION_CARD_TYPES, [activeIndex, 'cardMapper']),
  })),
  defaultProps({
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  }),
  fetchAirtable,
  withProps(({ records, dataSource, cardMapper }) => {
    const dataById = _.keyBy(data, 'id');

    const data = records.list
      .map(({ fields, id }) => ({ ...fields, id }))
      .map(mapObjKeysToCamel);

    const mapped = data.map(({ id, ...rest }) =>
      cardMapper({ key: id, value: rest }),
    );

    return {
      dataById,
      dataSource: dataSource.cloneWithRows(mapped),
      data: mapped,
    };
  }),
);
