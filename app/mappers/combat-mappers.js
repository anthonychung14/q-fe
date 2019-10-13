import { withProps } from 'recompose';

import COLORS from 'constants/colors';

const getColor = type => COLORS.movetype[type];

export const mapMoveToCard = ({
  key: moveId,
  value: { movename, shorthand, description, movetype },
}) => ({
  avatarColor: getColor(movetype),
  avatarName: shorthand,
  cardId: moveId,
  cardTitle: movename,
  cardType: shorthand,
  description,
});

export const mapSequenceToCard = ({
  key: sequenceId,
  value: { purpose, sequencename },
}) => ({
  avatarColor: getColor(purpose),
  avatarName: sequencename,
  cardId: sequenceId,
  cardTitle: sequencename,
  cardType: 'Shorthand of moves',
  description: 'Based on moves, we generate the description',
});

export const COMBAT_CARD_TYPES = [
  {
    cardName: 'Move',
    cardMapper: mapMoveToCard,
  },
  {
    cardName: 'Sequence',
    cardMapper: mapSequenceToCard,
  },
];

export const withMoveMappers = withProps(({ combatMove = [] }) => ({
  combatMove: combatMove.map(mapMoveToCard),
}));
