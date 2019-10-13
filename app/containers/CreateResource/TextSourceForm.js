/**
 * Creates a new text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'textSource';
const FIELDS = [
  {
    name: 'author',
    type: 'resource',
    label: 'creator of source',
    required: true,
  },
  {
    name: 'title',
    type: 'string',
    label: 'title of source',
    required: true,
  },
  {
    name: 'subtitle',
    type: 'string',
    label: 'subtitle (if applicable)',
  },
  {
    name: 'medium',
    type: 'string', // select
    required: true,
    label: 'subtitle (if applicable)',
  },
  {
    name: 'synopsis',
    type: 'string', // select
    label: 'short summary',
  },
  // {
  //   name: 'source_id',
  //   displayName: 'Source',
  //   type: 'resource',
  //   label: 'The source of the excerpt',
  // },
];

const TEXT_SOURCE = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default TEXT_SOURCE;
