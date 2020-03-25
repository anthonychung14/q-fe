/**
 * Text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'sourceContent';
const FIELDS = [
  {
    name: 'link',
    type: 'url',
    label: 'link to the content',
    required: true,
  },
  {
    name: 'content_maker',
    type: 'resource',
    label: 'maker of content',
    belongsTo: true,
  },
];

const SOURCE_CONTENT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default SOURCE_CONTENT;
