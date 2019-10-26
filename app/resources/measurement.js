/**
 * Creates a new text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'measurement';
const FIELDS = [
  {
    name: 'measurement',
    displayName: 'unit',
    type: 'string',
    label: 'Name of measurement',
    required: true,
  },
];

const MEASUREMENT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default MEASUREMENT;
