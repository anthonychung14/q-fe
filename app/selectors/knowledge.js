import _ from 'lodash';
import get from 'lodash.get';
import { ListView } from 'antd-mobile';
import { compose, withProps, defaultProps } from 'recompose';

import { fetchAirtable } from 'components/ResourceSelector/enhancers';
import { mapObjKeysToCamel } from 'utils/enhancers';

import COLORS from 'constants/colors';

const getColor = () => {
  return COLORS.modes.nutrition.CAL;
};

export const mapExcerptToCard = ({
  key: id,
  value: { title, content, ...rest },
}) => ({
  avatarColor: getColor(),
  avatarName: title,
  cardId: id,
  cardTitle: `${title}`,
  cardType: 'excerpt tags',
  description: content,
  ...rest,
});

export const mapTextSourceToCard = ({
  key: id,
  value: { title, medium, mediumForm, synopsis, ...rest },
}) => ({
  avatarColor: getColor(rest),
  avatarName: title,
  cardId: id,
  cardTitle: medium,
  cardType: mediumForm,
  description: synopsis,
});

export const KNOWLEDGE_CARD_TYPES = [
  {
    cardName: 'excerpt',
    cardMapper: mapExcerptToCard,
  },
  {
    cardName: 'textSource',
    cardMapper: mapTextSourceToCard,
  },
];

export const withKnowledgeCards = compose(
  withProps(({ activeIndex = 0 }) => ({
    activeCardType: get(KNOWLEDGE_CARD_TYPES, [activeIndex, 'cardName']),
    resourceType: get(KNOWLEDGE_CARD_TYPES, [activeIndex, 'cardName']),
    cardMapper: get(KNOWLEDGE_CARD_TYPES, [activeIndex, 'cardMapper']),
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
