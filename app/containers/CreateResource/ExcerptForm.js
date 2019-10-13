/**
 * Creates a new text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'excerpt';
const FIELDS = [
  {
    name: 'source_id',
    displayName: 'Source',
    type: 'resource',
    label: 'The source of the excerpt',
    required: true,
  },
  {
    name: 'title',
    type: 'string',
    label: 'Short, pithy summation',
    required: true,
  },
  {
    name: 'content',
    type: 'textArea',
    label: 'Contains the warrants and deeper evidence',
    required: true,
  },
];

const EXCERPT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default EXCERPT;
