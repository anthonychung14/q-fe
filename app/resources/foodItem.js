/**
 * Creates a new text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'foodItem';
const FIELDS = [
  {
    name: 'ingredient',
    displayName: 'ingredient',
    type: 'string',
    label: 'Name of the food',
    required: true,
  },
  {
    resourceName: 'author',
    name: 'creator',
    displayName: 'creator',
    type: 'resource',
    label: 'creator of source',
    many: true,
    required: true,
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
    name: 'serving_size',
    displayName: 'serving size',
    type: 'integer',
    label: 'serving size',
    required: true,
    unique: true,
  },
  {
    resourceName: 'unitMeasurement',
    name: 'serving_unit',
    displayName: 'uom',
    type: 'resource',
    label: 'serving_measurement',
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
    name: 'grams_carbs',
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
    name: 'price_usd_cents',
    displayName: 'price',
    type: 'integer',
    label: 'price in cents',
    required: true,
  },
  {
    name: 'media',
    type: 'media',
    label: 'a helpful picture of the item',
    required: true,
  },
];

const FOOD_ITEM = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default FOOD_ITEM;
