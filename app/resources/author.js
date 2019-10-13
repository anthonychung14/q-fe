/**
 * Author
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'author';
const FIELDS = [
  {
    resourceName: 'author',
    name: 'name',
    displayName: 'name',
    type: 'resource',
    label: 'The name of the author',
    required: true,
    unique: true,
  },
  {
    name: 'charType',
    type: 'checkbox',
    values: ['person', 'company'],
    label: 'Type of character',
    required: true,
  },
  {
    name: 'notes',
    type: 'textArea',
    label: 'Any notes on the character',
  },
];

const EXCERPT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default EXCERPT;
