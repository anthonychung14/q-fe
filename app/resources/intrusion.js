/**
 * Creates a new incident
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'intrusion';
const FIELDS = [
  {
    name: 'location',
    type: 'checkbox',
    values: [
      'lobby',
      'elevator',
      'freight elevator',
      'parking garage',
      'hallways',
      'package room',
    ],
    label: 'location',
    required: true,
  },
  {
    name: 'description',
    type: 'textArea',
    label: 'optional description of incident',
    required: true,
  },
  {
    name: 'Media',
    type: 'media',
    label: 'a helpful picture',
  },
];

const INTRUSION = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default INTRUSION;
