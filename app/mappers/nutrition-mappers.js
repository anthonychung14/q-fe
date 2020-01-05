import COLORS from 'constants/colors';

const getColor = () => {
  return COLORS.modes.consume.CAL;
};

export const mapFoodItemToCard = ({
  key: foodId,
  value: {
    ingredient,
    caloriesClaimed,
    caloriesAtwater,
    foodType,
    servingUnit,
    servingSize,
    // description = 'Based on moves, we generate the description',
    // gramsProtein,
    // gramsFat,
    // gramsCarbs,
    ...rest
  },
}) => ({
  avatarColor: getColor(),
  avatarName: ingredient,
  cardId: foodId,
  cardTitle: `${ingredient}`,
  cardType: `${caloriesAtwater} calories`,
  description: `${servingSize} ${servingUnit}`,
  ingredient,
  isMeal: foodType === 'meal',
  caloriesClaimed,
  caloriesAtwater,
  servingUnit,
  servingSize,
  ...rest,
});

export const mapMealToCard = mapFoodItemToCard;

export const NUTRITION_CARD_TYPES = [
  {
    cardName: 'foodItem',
    cardMapper: mapFoodItemToCard,
  },
  {
    cardName: 'meal',
    cardMapper: mapMealToCard,
  },
];
