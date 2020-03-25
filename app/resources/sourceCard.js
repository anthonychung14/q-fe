/**
 * Excerpts
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'sourceCard';
const FIELDS = [
  {
    name: 'excerpt',
    type: 'resource',
    label: 'origin of excerpt',
    belongsTo: true,
  },
  {
    name: 'title',
    type: 'string',
    label: 'Short, pithy summation',
    required: true,
  },
  {
    name: 'subtitle',
    type: 'string',
    label: 'slightly more detail',
    required: false,
  },
  {
    name: 'warrant',
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
