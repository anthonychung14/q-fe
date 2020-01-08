/**
 * Creates a new meal
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'meal';
const FIELDS = [
  {
    name: 'meal_name',
    displayName: 'meal name',
    type: 'string',
    label: 'Name of meal',
    required: true,
  },
  {
    name: 'description',
    type: 'string',
    label: 'contains the foods',
    required: true,
  },
  {
    resourceName: 'author',
    name: 'creator',
    displayName: 'creator',
    type: 'resource',
    label: 'creator of source',
    required: true,
  },
  {
    resourceName: 'foodItem',
    name: 'food_ids',
    displayName: 'name',
    type: 'resource',
    label: 'discernible foods',
  },
  {
    resourceName: 'author',
    name: 'supplier',
    displayName: 'supplier',
    type: 'resource',
    label: 'supplier of source',
    required: true,
  },
  {
    name: 'grams_protein',
    displayName: 'protein',
    type: 'integer',
    label: 'grams of protein',
    required: true,
  },
  {
    name: 'grams_fiber',
    displayName: 'fiber',
    type: 'integer',
    label: 'grams of fiber',
    required: true,
  },
  {
    name: 'grams_carb',
    displayName: 'carbs',
    type: 'integer',
    label: 'grams of carbs',
    required: true,
  },
  {
    name: 'grams_fat',
    displayName: 'fat',
    type: 'integer',
    label: 'grams of fat',
    required: true,
  },
  {
    name: 'calories_claimed',
    displayName: 'calories',
    type: 'integer',
    label: 'calories in meal',
    required: true,
  },
  {
    name: 'media',
    type: 'media',
    label: 'a helpful picture of the meal',
    required: true,
  },
];

const MEAL = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default MEAL;
