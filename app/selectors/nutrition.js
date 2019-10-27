import _ from 'lodash';
import get from 'lodash.get';
import { ListView } from 'antd-mobile';

import { compose, withProps, defaultProps } from 'recompose';
import { fetchAirtable } from 'components/ResourceSelector/enhancers';
import { mapObjKeysToCamel } from 'utils/enhancers';

import { NUTRITION_CARD_TYPES } from 'mappers/nutrition-mappers';

// we need both sets from airtable
// nutritionFoodItem
// nutritionMeal

// it should be

// defaultProps({
//   dataById: {},
//   dataSource: new ListView.DataSource({
//     rowHasChanged: (row1, row2) => row1 !== row2,
//   }),
// }),
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

    return {
      dataById,
      dataSource: dataSource.cloneWithRows(
        data.map(({ id, ...rest }) => cardMapper({ key: id, value: rest })),
      ),
    };
  }),
);
