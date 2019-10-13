/**
 * Text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'textSource';
const FIELDS = [
  {
    name: 'medium',
    type: 'checkbox',
    values: ['text', 'video', 'audio'],
    // required: true,
    label: 'method of ingesting data',
  },
  {
    resourceName: 'author',
    name: 'author',
    displayName: 'author',
    type: 'resource',
    label: 'creator of source',
    many: true,
    required: true,
  },

  {
    name: 'title',
    type: 'string',
    label: 'title of source',
    // required: true,
  },
  {
    name: 'subtitle',
    type: 'string',
    label: 'subtitle (if applicable)',
  },

  {
    name: 'synopsis',
    type: 'textArea', // select
    label: 'short summary',
  },
];

const TEXT_SOURCE = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default TEXT_SOURCE;
