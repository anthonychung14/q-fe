/**
 * Creates a new text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'foodItem';
const FIELDS = [
  {
    name: 'food_type',
    type: 'checkbox',
    values: ['item', 'meal'],
    label: 'is it a meal',
    required: true,
  },
  {
    name: 'ingredient',
    displayName: 'ingredient',
    type: 'string',
    label: 'what to call it',
    required: true,
  },
  {
    resourceName: 'author',
    name: 'producer',
    displayName: 'producer',
    type: 'resource',
    label: 'producer of source',
    required: true,
    createOnBlur: true,
  },
  {
    resourceName: 'author',
    name: 'supplier',
    displayName: 'supplier',
    type: 'resource',
    label: 'supplier of source',
    required: true,
    createOnBlur: true,
  },
  {
    resourceName: 'unitMeasurement',
    name: 'serving_unit',
    displayName: 'uom',
    type: 'resource',
    label: 'serving_measurement',
    required: true,
    createOnBlur: true,
  },
  {
    name: 'serving_size',
    displayName: 'serving size',
    type: 'integer',
    label: 'serving size',
    required: true,
    unique: true,
  },
  {
    name: 'serving_per_unit',
    displayName: 'serving size',
    type: 'integer',
    label: 'servings per unit',
  },
  {
    name: 'calories_claimed',
    displayName: 'calories',
    type: 'integer',
    label: 'calories in meal',
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
    name: 'grams_carb',
    displayName: 'carbs',
    type: 'integer',
    label: 'grams of carbs',
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
    name: 'media',
    type: 'media',
    label: 'a helpful picture of the item',
  },
];

const FOOD_ITEM = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default FOOD_ITEM;
