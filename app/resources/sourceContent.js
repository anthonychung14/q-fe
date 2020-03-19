/**
 * Text source
 *
 * @flow
 * @format
 */

const RESOURCE_TYPE = 'sourceContent';
const FIELDS = [
  {
    name: 'content_category',
    type: 'checkbox',
    values: ['PODCAST', 'YOUTUBE', 'ARTICLE', 'BOOK'],
    required: true,
    label: 'method of ingesting data',
  },
  {
    name: 'link',
    type: 'url',
    label: 'link to the content',
    // required: true,
  },
];

const SOURCE_CONTENT = {
  name: RESOURCE_TYPE,
  fields: FIELDS,
};

export default SOURCE_CONTENT;
