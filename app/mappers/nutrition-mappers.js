import COLORS from 'constants/colors';

const getColor = () => {
  return COLORS.modes.nutrition.CAL;
};

export const mapFoodItemToCard = ({
  key: foodId,
  value: {
    ingredient,
    caloriesClaimed,
    caloriesAtwater,
    servingUnit,
    servingSize,
    supplier,
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
  cardType: `${caloriesClaimed || caloriesAtwater} calories`,
  description: `${servingSize} ${servingUnit}`,
  ingredient,
  caloriesClaimed,
  caloriesAtwater,
  servingUnit,
  servingSize,
  supplier,
  ...rest,
});

export const mapMealToCard = ({
  key: mealId,
  value: {
    mealName,
    description = 'Based on moves, we generate the description',
    ...rest
  },
}) => ({
  avatarColor: getColor(rest),
  avatarName: mealName,
  cardId: mealId,
  cardTitle: mealName,
  cardType: 'Shorthand of moves',
  description,
  mealName,
  ...rest,
});

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
