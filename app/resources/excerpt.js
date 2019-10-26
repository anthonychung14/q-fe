/**
 * Excerpts
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'excerpt';
const FIELDS = [
  {
    resourceName: 'textSource',
    name: 'textSource',
    displayName: 'source',
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
  {
    name: 'media',
    type: 'media',
    label: 'a helpful picture of the palace',
    required: true,
  },
];

const EXCERPT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default EXCERPT;
